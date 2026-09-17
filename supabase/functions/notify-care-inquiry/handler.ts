const JSON_CONTENT_TYPE = "application/json";
const MAX_BODY_BYTES = 64 * 1024;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const WEBHOOK_SECRET_HEADER = "x-le-minou-webhook-secret";

const INQUIRY_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CLAIM_TOKEN_PATTERN = INQUIRY_ID_PATTERN;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EnvironmentReader = (name: string) => string | undefined;
type Fetcher = typeof fetch;
type LogContext = Record<string, string | number>;

export type SafeLogger = {
  info: (event: string, context?: LogContext) => void;
  warn: (event: string, context?: LogContext) => void;
  error: (event: string, context?: LogContext) => void;
};

export type HandlerDependencies = {
  fetch: Fetcher;
  getEnv: EnvironmentReader;
  logger: SafeLogger;
};

type RuntimeConfig = {
  resendApiKey: string;
  reviewUrl?: string;
  supabaseSecretKey: string;
  supabaseUrl: string;
  toEmail: string;
  fromEmail: string;
};

type ClaimResult = {
  claim_status: "claimed" | "sent" | "busy" | "manual_review" | "invalid";
  claim_token: string | null;
  attempt_count: number;
};

type ValidatedEvent = {
  inquiryId: string;
  receivedAt: string;
  receivedAtForClaim: string;
};

type Audience = "owner" | "client";
export type InquiryDetails = {
  full_name: string;
  email: string;
  pet_names: string | null;
  pet_type: string;
  pet_count: number;
  services: string[];
  timing_type: string;
  start_date: string | null;
  end_date: string | null;
  recurring_schedule: string | null;
};

function ledgerFunction(action: string, audience: Audience): string {
  return `${action}_care_inquiry_${
    audience === "client" ? "client_confirmation" : "notification"
  }_delivery`;
}

class SafeProcessingError extends Error {
  constructor(
    readonly code: string,
    readonly status: number,
    readonly ledgerError?: string,
  ) {
    super(code);
  }
}

const defaultLogger: SafeLogger = {
  info: (event, context = {}) => console.info(JSON.stringify({ event, ...context })),
  warn: (event, context = {}) => console.warn(JSON.stringify({ event, ...context })),
  error: (event, context = {}) => console.error(JSON.stringify({ event, ...context })),
};

function jsonResponse(status: number, code: string, details: LogContext = {}): Response {
  return new Response(JSON.stringify({ ok: status >= 200 && status < 300, code, ...details }), {
    status,
    headers: {
      "Content-Type": `${JSON_CONTENT_TYPE}; charset=utf-8`,
      "Cache-Control": "no-store",
    },
  });
}

function requiredEnvironmentValue(getEnv: EnvironmentReader, name: string): string {
  const value = getEnv(name)?.trim();
  if (!value) throw new SafeProcessingError("configuration_error", 500);
  return value;
}

function parseSupabaseSecretKey(getEnv: EnvironmentReader): string {
  const encodedKeys = requiredEnvironmentValue(getEnv, "SUPABASE_SECRET_KEYS");

  try {
    const keys = JSON.parse(encodedKeys) as Record<string, unknown>;
    const secretKey = keys.default;
    if (typeof secretKey !== "string" || !secretKey.startsWith("sb_secret_")) {
      throw new Error("missing default secret key");
    }
    return secretKey;
  } catch {
    throw new SafeProcessingError("configuration_error", 500);
  }
}

function validateEmailConfiguration(value: string): string {
  if (value.length > 320 || /[\r\n]/.test(value)) {
    throw new SafeProcessingError("configuration_error", 500);
  }

  const addressMatch = value.match(/<([^<>]+)>$/);
  const address = addressMatch?.[1] ?? value;
  if (!EMAIL_PATTERN.test(address)) throw new SafeProcessingError("configuration_error", 500);
  return value;
}

function parseRuntimeConfig(getEnv: EnvironmentReader): RuntimeConfig {
  const rawSupabaseUrl = requiredEnvironmentValue(getEnv, "SUPABASE_URL");
  let supabaseUrl: URL;

  try {
    supabaseUrl = new URL(rawSupabaseUrl);
  } catch {
    throw new SafeProcessingError("configuration_error", 500);
  }

  const isLocal = supabaseUrl.hostname === "127.0.0.1" || supabaseUrl.hostname === "localhost";
  if (supabaseUrl.protocol !== "https:" && !(isLocal && supabaseUrl.protocol === "http:")) {
    throw new SafeProcessingError("configuration_error", 500);
  }

  const rawReviewUrl = getEnv("INQUIRY_REVIEW_URL")?.trim();
  let reviewUrl: string | undefined;
  if (rawReviewUrl) {
    try {
      const parsedReviewUrl = new URL(rawReviewUrl);
      if (
        parsedReviewUrl.protocol !== "https:" || parsedReviewUrl.username ||
        parsedReviewUrl.password
      ) {
        throw new Error("review URL must be a credential-free HTTPS URL");
      }
      reviewUrl = parsedReviewUrl.toString();
    } catch {
      throw new SafeProcessingError("configuration_error", 500);
    }
  }

  return {
    resendApiKey: requiredEnvironmentValue(getEnv, "RESEND_API_KEY"),
    reviewUrl,
    supabaseSecretKey: parseSupabaseSecretKey(getEnv),
    supabaseUrl: supabaseUrl.toString().replace(/\/$/, ""),
    toEmail: validateEmailConfiguration(requiredEnvironmentValue(getEnv, "INQUIRY_TO_EMAIL")),
    fromEmail: validateEmailConfiguration(requiredEnvironmentValue(getEnv, "INQUIRY_FROM_EMAIL")),
  };
}

async function secretsMatch(supplied: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [suppliedDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(supplied)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  const suppliedBytes = new Uint8Array(suppliedDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let difference = 0;
  for (let index = 0; index < suppliedBytes.length; index += 1) {
    difference |= suppliedBytes[index] ^ expectedBytes[index];
  }
  return difference === 0;
}

async function readBodyWithLimit(request: Request): Promise<string> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > MAX_BODY_BYTES) {
    throw new SafeProcessingError("payload_too_large", 413);
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new SafeProcessingError("payload_too_large", 413);
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

function validateWebhookPayload(payload: unknown): ValidatedEvent {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new SafeProcessingError("invalid_event", 422);
  }

  const event = payload as Record<string, unknown>;
  if (
    event.type !== "INSERT" || event.schema !== "public" || event.table !== "care_inquiry" ||
    event.old_record !== null
  ) {
    throw new SafeProcessingError("invalid_event", 422);
  }

  if (!event.record || typeof event.record !== "object" || Array.isArray(event.record)) {
    throw new SafeProcessingError("invalid_event", 422);
  }

  const record = event.record as Record<string, unknown>;
  if (typeof record.id !== "string" || !INQUIRY_ID_PATTERN.test(record.id)) {
    throw new SafeProcessingError("invalid_inquiry_reference", 422);
  }

  if (typeof record.created_at !== "string") {
    throw new SafeProcessingError("invalid_received_timestamp", 422);
  }

  const parsedTimestamp = new Date(record.created_at);
  if (Number.isNaN(parsedTimestamp.getTime())) {
    throw new SafeProcessingError("invalid_received_timestamp", 422);
  }

  return {
    inquiryId: record.id.toLowerCase(),
    receivedAt: parsedTimestamp.toISOString(),
    receivedAtForClaim: record.created_at,
  };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

const serviceLabels: Record<string, string> = {
  "30-MINUTE VISIT": "30-min cat visit",
  "60-MINUTE VISIT": "60-min cat visit",
  "DOG WALK": "30-min dog walk",
  "60-MINUTE DOG WALK": "60-min dog walk",
};

export function buildEmailContent(
  event: ValidatedEvent,
  details: InquiryDetails,
  reviewUrl?: string,
  audience: Audience = "owner",
) {
  const timing = details.timing_type === "specific_dates"
    ? details.start_date === details.end_date
      ? details.start_date!
      : `${details.start_date} to ${details.end_date}`
    : details.timing_type === "recurring"
    ? details.recurring_schedule!
    : "Not sure yet";
  const rows = [
    ["Client", details.full_name],
    ["Email", details.email],
    ["Pet names", details.pet_names || "Not provided"],
    [
      "Pets",
      `${
        ({ cat: "Cat", dog: "Dog", both: "Cat & dog" } as Record<string, string>)[details.pet_type]
      } · ${details.pet_count}`,
    ],
    ["Care", details.services.map((service) => serviceLabels[service] || service).join(", ")],
    ["When", timing],
  ];
  const heading = audience === "owner" ? "New care request" : "Request received";
  const intro = audience === "owner"
    ? "A new care request was received."
    : "Thanks for your request! Erin will email you about availability. Your booking isn’t confirmed yet.";
  const ownerLink = audience === "owner" ? reviewUrl : undefined;
  return {
    subject: audience === "owner" ? "New Le Minou care inquiry" : "Le Minou — request received",
    text: [
      "Le Minou",
      "",
      intro,
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      `Inquiry reference: ${event.inquiryId}`,
      `Received: ${event.receivedAt}`,
      ...(ownerLink ? [`Review request: ${ownerLink}`] : []),
      ...(audience === "client" ? ["", "You can reply to this email with questions."] : []),
    ].join("\n"),
    html: [
      '<div style="font-family:Arial,sans-serif;color:#292126;line-height:1.6">',
      '<p style="color:#980061;font-weight:bold">Le Minou</p>',
      `<h1 style="font-family:Georgia,serif;font-size:26px">${heading}</h1>`,
      `<p>${escapeHtml(intro)}</p>`,
      ...rows.map(([label, value]) =>
        `<p><strong>${label}:</strong> ${escapeHtml(value).replace(/\r?\n/g, "<br>")}</p>`
      ),
      `<p><strong>Inquiry reference:</strong> ${escapeHtml(event.inquiryId)}<br>`,
      `<strong>Received:</strong> ${escapeHtml(event.receivedAt)}</p>`,
      ownerLink ? `<p><a href="${escapeHtml(ownerLink)}">Review request</a></p>` : "",
      audience === "client" ? "<p>You can reply to this email with questions.</p>" : "",
      "</div>",
    ].join(""),
  };
}

async function loadInquiryDetails(
  fetcher: Fetcher,
  config: RuntimeConfig,
  event: ValidatedEvent,
): Promise<InquiryDetails> {
  const query = new URLSearchParams({
    id: `eq.${event.inquiryId}`,
    created_at: `eq.${event.receivedAtForClaim}`,
    select:
      "full_name,email,pet_names,pet_type,pet_count,services,timing_type,start_date,end_date,recurring_schedule",
  });
  let response: Response;
  try {
    response = await fetcher(`${config.supabaseUrl}/rest/v1/care_inquiry?${query}`, {
      headers: { apikey: config.supabaseSecretKey },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error("lookup failed");
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length !== 1) {
      throw new SafeProcessingError("inquiry_event_not_found", 422);
    }
    const row = rows[0];
    if (
      typeof row.full_name !== "string" || !row.full_name.trim() || row.full_name.length > 120 ||
      typeof row.email !== "string" || row.email.length > 254 || !EMAIL_PATTERN.test(row.email) ||
      (row.pet_names !== null &&
        (typeof row.pet_names !== "string" || row.pet_names.length > 250)) ||
      !["cat", "dog", "both"].includes(row.pet_type) || !Number.isInteger(row.pet_count) ||
      row.pet_count < 1 || row.pet_count > 20 ||
      !Array.isArray(row.services) || row.services.length < 1 || row.services.length > 4 ||
      row.services.some((value: unknown) =>
        typeof value !== "string" || !(value in serviceLabels)
      ) ||
      !["specific_dates", "recurring", "not_sure"].includes(row.timing_type) ||
      (row.timing_type === "specific_dates" &&
        (typeof row.start_date !== "string" || typeof row.end_date !== "string")) ||
      (row.timing_type === "recurring" &&
        (typeof row.recurring_schedule !== "string" || !row.recurring_schedule.trim() ||
          row.recurring_schedule.length > 500))
    ) {
      throw new SafeProcessingError("inquiry_details_invalid", 422);
    }
    return row as InquiryDetails;
  } catch (error) {
    if (error instanceof SafeProcessingError) throw error;
    throw new SafeProcessingError("inquiry_lookup_failed", 502);
  }
}

async function callLedgerRpc(
  fetcher: Fetcher,
  config: RuntimeConfig,
  functionName: string,
  body: Record<string, string>,
): Promise<unknown> {
  let response: Response;
  try {
    response = await fetcher(`${config.supabaseUrl}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        apikey: config.supabaseSecretKey,
        "Content-Type": JSON_CONTENT_TYPE,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    throw new SafeProcessingError("ledger_unavailable", 502);
  }

  if (!response.ok) throw new SafeProcessingError("ledger_request_failed", 502);

  try {
    return await response.json();
  } catch {
    throw new SafeProcessingError("ledger_response_invalid", 502);
  }
}

async function claimDelivery(
  fetcher: Fetcher,
  config: RuntimeConfig,
  event: ValidatedEvent,
  audience: Audience,
): Promise<ClaimResult> {
  const result = await callLedgerRpc(
    fetcher,
    config,
    ledgerFunction("claim", audience),
    {
      p_inquiry_id: event.inquiryId,
      p_inquiry_created_at: event.receivedAtForClaim,
    },
  );

  const claim = Array.isArray(result) ? result[0] : undefined;
  if (
    !claim ||
    !["claimed", "sent", "busy", "manual_review", "invalid"].includes(claim.claim_status) ||
    !Number.isInteger(claim.attempt_count) ||
    (claim.claim_status === "invalid" && claim.attempt_count !== 0) ||
    (claim.claim_status !== "invalid" && claim.attempt_count < 1)
  ) {
    throw new SafeProcessingError("ledger_response_invalid", 502);
  }

  if (
    claim.claim_status === "claimed" &&
    (typeof claim.claim_token !== "string" || !CLAIM_TOKEN_PATTERN.test(claim.claim_token))
  ) {
    throw new SafeProcessingError("ledger_response_invalid", 502);
  }

  if (claim.claim_status !== "claimed" && claim.claim_token !== null) {
    throw new SafeProcessingError("ledger_response_invalid", 502);
  }

  return claim as ClaimResult;
}

async function finalizeDelivery(
  fetcher: Fetcher,
  config: RuntimeConfig,
  functionName: string,
  body: Record<string, string>,
): Promise<boolean> {
  const result = await callLedgerRpc(fetcher, config, functionName, body);
  return result === true;
}

function providerFailureCode(status: number): string {
  if (status === 429) return "provider_rate_limited";
  if (status === 409) return "provider_idempotency_conflict";
  if (status >= 500) return "provider_unavailable";
  return "provider_rejected";
}

async function sendEmail(
  fetcher: Fetcher,
  config: RuntimeConfig,
  event: ValidatedEvent,
  details: InquiryDetails,
  audience: Audience,
): Promise<string> {
  const content = buildEmailContent(event, details, config.reviewUrl, audience);
  let response: Response;

  try {
    response = await fetcher(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "Content-Type": JSON_CONTENT_TYPE,
        "Idempotency-Key": audience === "owner"
          ? `care-inquiry/${event.inquiryId}`
          : `care-inquiry-confirmation/${event.inquiryId}`,
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [audience === "owner" ? config.toEmail : details.email],
        reply_to: audience === "owner" ? details.email : config.toEmail,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new SafeProcessingError("provider_request_failed", 502, "provider_request_failed");
  }

  if (!response.ok) {
    const code = providerFailureCode(response.status);
    throw new SafeProcessingError("notification_delivery_failed", 502, code);
  }

  try {
    const result = (await response.json()) as Record<string, unknown>;
    if (typeof result.id !== "string" || !INQUIRY_ID_PATTERN.test(result.id)) {
      throw new Error("invalid provider id");
    }
    return result.id.toLowerCase();
  } catch {
    throw new SafeProcessingError("provider_response_invalid", 502, "provider_response_invalid");
  }
}

async function deliverEmail(
  dependencies: HandlerDependencies,
  config: RuntimeConfig,
  event: ValidatedEvent,
  details: InquiryDetails,
  audience: Audience,
): Promise<Response> {
  let claim: ClaimResult;
  try {
    claim = await claimDelivery(dependencies.fetch, config, event, audience);
  } catch (error) {
    const code = error instanceof SafeProcessingError ? error.code : "ledger_request_failed";
    dependencies.logger.error(code, { inquiry_id: event.inquiryId, audience });
    return jsonResponse(502, code, { inquiry_id: event.inquiryId, audience });
  }

  if (claim.claim_status === "sent") {
    dependencies.logger.info("notification_already_sent", {
      inquiry_id: event.inquiryId,
      audience,
    });
    return jsonResponse(200, "already_sent", { inquiry_id: event.inquiryId, audience });
  }

  if (claim.claim_status === "busy") {
    dependencies.logger.info("notification_processing", { inquiry_id: event.inquiryId, audience });
    return jsonResponse(202, "processing", { inquiry_id: event.inquiryId, audience });
  }

  if (claim.claim_status === "manual_review") {
    dependencies.logger.warn("notification_manual_review_required", {
      inquiry_id: event.inquiryId,
      audience,
    });
    return jsonResponse(409, "manual_review_required", { inquiry_id: event.inquiryId, audience });
  }

  if (claim.claim_status === "invalid") {
    dependencies.logger.warn("inquiry_event_not_found", { inquiry_id: event.inquiryId, audience });
    return jsonResponse(422, "inquiry_event_not_found", { inquiry_id: event.inquiryId, audience });
  }

  const claimToken = claim.claim_token as string;
  dependencies.logger.info("notification_claimed", {
    inquiry_id: event.inquiryId,
    audience,
    attempt_count: claim.attempt_count,
  });

  let providerMessageId: string;
  try {
    providerMessageId = await sendEmail(dependencies.fetch, config, event, details, audience);
  } catch (error) {
    const processingError = error instanceof SafeProcessingError
      ? error
      : new SafeProcessingError("notification_delivery_failed", 502, "provider_request_failed");
    const ledgerError = processingError.ledgerError ?? "provider_request_failed";

    let failureRecorded = false;
    try {
      failureRecorded = await finalizeDelivery(
        dependencies.fetch,
        config,
        ledgerFunction("fail", audience),
        {
          p_inquiry_id: event.inquiryId,
          p_claim_token: claimToken,
          p_last_error: ledgerError,
        },
      );
    } catch {
      failureRecorded = false;
    }

    if (!failureRecorded) {
      dependencies.logger.error("ledger_failure_record_failed", {
        inquiry_id: event.inquiryId,
        audience,
      });
    }

    dependencies.logger.error(ledgerError, { inquiry_id: event.inquiryId, audience });
    return jsonResponse(processingError.status, processingError.code, {
      inquiry_id: event.inquiryId,
      audience,
    });
  }

  let completed = false;
  try {
    completed = await finalizeDelivery(
      dependencies.fetch,
      config,
      ledgerFunction("complete", audience),
      {
        p_inquiry_id: event.inquiryId,
        p_claim_token: claimToken,
        p_provider_message_id: providerMessageId,
      },
    );
  } catch {
    completed = false;
  }

  if (!completed) {
    dependencies.logger.error("ledger_finalize_failed", { inquiry_id: event.inquiryId, audience });
    return jsonResponse(502, "ledger_finalize_failed", { inquiry_id: event.inquiryId, audience });
  }

  dependencies.logger.info("notification_sent", {
    inquiry_id: event.inquiryId,
    audience,
    attempt_count: claim.attempt_count,
  });
  return jsonResponse(200, "sent", { inquiry_id: event.inquiryId, audience });
}

export function createHandler(overrides: Partial<HandlerDependencies> = {}) {
  const dependencies: HandlerDependencies = {
    fetch,
    getEnv: (name) => Deno.env.get(name),
    logger: defaultLogger,
    ...overrides,
  };

  return async (request: Request): Promise<Response> => {
    if (request.method !== "POST") {
      const response = jsonResponse(405, "method_not_allowed");
      response.headers.set("Allow", "POST");
      return response;
    }

    let webhookSecret: string;
    try {
      webhookSecret = requiredEnvironmentValue(dependencies.getEnv, "INQUIRY_WEBHOOK_SECRET");
      if (webhookSecret.length < 32 || webhookSecret.length > 256) {
        throw new SafeProcessingError("configuration_error", 500);
      }
    } catch (error) {
      dependencies.logger.error("configuration_error");
      return jsonResponse(
        error instanceof SafeProcessingError ? error.status : 500,
        "configuration_error",
      );
    }

    const suppliedSecret = request.headers.get(WEBHOOK_SECRET_HEADER);
    if (
      !suppliedSecret ||
      suppliedSecret.length > 256 ||
      !(await secretsMatch(suppliedSecret, webhookSecret))
    ) {
      dependencies.logger.warn("webhook_authentication_failed");
      return jsonResponse(401, "unauthorized");
    }

    let config: RuntimeConfig;
    try {
      config = parseRuntimeConfig(dependencies.getEnv);
    } catch {
      dependencies.logger.error("configuration_error");
      return jsonResponse(500, "configuration_error");
    }

    const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
    if (contentType !== JSON_CONTENT_TYPE) return jsonResponse(415, "unsupported_media_type");

    let event: ValidatedEvent;
    try {
      const body = await readBodyWithLimit(request);
      let payload: unknown;
      try {
        payload = JSON.parse(body);
      } catch {
        throw new SafeProcessingError("malformed_json", 400);
      }
      event = validateWebhookPayload(payload);
    } catch (error) {
      if (error instanceof SafeProcessingError) return jsonResponse(error.status, error.code);
      return jsonResponse(400, "malformed_request");
    }

    let details: InquiryDetails;
    try {
      details = await loadInquiryDetails(dependencies.fetch, config, event);
    } catch (error) {
      const failure = error instanceof SafeProcessingError
        ? error
        : new SafeProcessingError("inquiry_lookup_failed", 502);
      dependencies.logger.error(failure.code, { inquiry_id: event.inquiryId });
      return jsonResponse(failure.status, failure.code, { inquiry_id: event.inquiryId });
    }
    // Separate claims mean either recipient can succeed even if the other send fails.
    const owner = await deliverEmail(dependencies, config, event, details, "owner");
    const client = await deliverEmail(dependencies, config, event, details, "client");
    if (!owner.ok) return owner;
    if (!client.ok) return client;
    if (owner.status === 202 || client.status === 202) {
      return jsonResponse(202, "processing", { inquiry_id: event.inquiryId });
    }
    const results = await Promise.all([owner.json(), client.json()]);
    return jsonResponse(
      200,
      results.every((result) => result.code === "already_sent") ? "already_sent" : "sent",
      { inquiry_id: event.inquiryId },
    );
  };
}
