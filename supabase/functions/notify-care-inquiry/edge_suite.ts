import { buildEmailContent, createHandler, escapeHtml, type SafeLogger } from "./handler.ts";

const INQUIRY_ID = "11111111-1111-4111-8111-111111111111";
const CLAIM_TOKEN = "22222222-2222-4222-8222-222222222222";
const PROVIDER_MESSAGE_ID = "33333333-3333-4333-8333-333333333333";
const WEBHOOK_SECRET = "local-test-webhook-secret-000000000000";
const RESEND_KEY = "local-test-resend-key";
const SUPABASE_SECRET_KEY = "sb_secret_local_test_only";

const PRIVATE_VALUES = {
  email: "visitor-private@example.com",
  phone: "312-555-0199",
  address: "123 Private Street",
  notes: "Needs medication with dinner",
  veterinarian: "Private Vet Clinic",
  medications: "Secret prescription",
  accessCode: "alarm-2468",
};

const validPayload = {
  type: "INSERT",
  schema: "public",
  table: "care_inquiry",
  record: {
    id: INQUIRY_ID,
    created_at: "2026-08-30T17:00:00.000Z",
    full_name: "Private Visitor",
    email: PRIVATE_VALUES.email,
    phone: PRIVATE_VALUES.phone,
    neighborhood_or_zip: PRIVATE_VALUES.address,
    pet_routine_notes: PRIVATE_VALUES.notes,
    veterinarian: PRIVATE_VALUES.veterinarian,
    medications: PRIVATE_VALUES.medications,
    access_code: PRIVATE_VALUES.accessCode,
  },
  old_record: null,
};

type LedgerState = "new" | "processing" | "sent" | "failed";

type HarnessOptions = {
  completeSucceeds?: boolean;
  initialState?: LedgerState;
  providerResponse?: () => Promise<Response> | Response;
};

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

function assertEquals(actual: unknown, expected: unknown, message = "values are not equal") {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`${message}\nactual: ${actualJson}\nexpected: ${expectedJson}`);
  }
}

function assertStringExcludes(value: string, excluded: string[]) {
  for (const item of excluded) {
    assert(!value.includes(item), `unexpected private value in output: ${item}`);
  }
}

function createHarness(options: HarnessOptions = {}) {
  const environment = new Map<string, string>([
    ["INQUIRY_WEBHOOK_SECRET", WEBHOOK_SECRET],
    ["RESEND_API_KEY", RESEND_KEY],
    ["INQUIRY_TO_EMAIL", "configured-owner@example.com"],
    ["INQUIRY_FROM_EMAIL", "Le Minou <care@example.org>"],
    ["INQUIRY_REVIEW_URL", "https://supabase.com/dashboard/project/test/editor"],
    ["SUPABASE_URL", "https://test-project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: SUPABASE_SECRET_KEY })],
  ]);
  const logs: Array<{ level: string; event: string; context: Record<string, string | number> }> =
    [];
  const logger: SafeLogger = {
    info: (event, context = {}) => logs.push({ level: "info", event, context }),
    warn: (event, context = {}) => logs.push({ level: "warn", event, context }),
    error: (event, context = {}) => logs.push({ level: "error", event, context }),
  };

  let ledgerState = options.initialState ?? "new";
  let attemptCount = ledgerState === "new" ? 0 : 1;
  let resendCount = 0;
  let lastClaimRequest: { url: string; init: RequestInit } | undefined;
  let lastResendRequest: { url: string; init: RequestInit } | undefined;
  let failedError: string | undefined;

  const fetcher = async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = typeof input === "string"
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;

    if (url.endsWith("/rpc/claim_care_inquiry_notification_delivery")) {
      lastClaimRequest = { url, init };
      const body = JSON.parse(String(init.body)) as Record<string, string>;
      if (
        body.p_inquiry_id !== INQUIRY_ID ||
        body.p_inquiry_created_at !== validPayload.record.created_at
      ) {
        return Response.json([{
          claim_status: "invalid",
          claim_token: null,
          attempt_count: 0,
        }]);
      }

      if (ledgerState === "sent") {
        return Response.json([{
          claim_status: "sent",
          claim_token: null,
          attempt_count: attemptCount,
        }]);
      }
      if (ledgerState === "processing") {
        return Response.json([{
          claim_status: "busy",
          claim_token: null,
          attempt_count: attemptCount,
        }]);
      }

      ledgerState = "processing";
      attemptCount += 1;
      return Response.json([{
        claim_status: "claimed",
        claim_token: CLAIM_TOKEN,
        attempt_count: attemptCount,
      }]);
    }

    if (url.endsWith("/rpc/complete_care_inquiry_notification_delivery")) {
      const body = JSON.parse(String(init.body)) as Record<string, string>;
      const completed = options.completeSucceeds !== false && ledgerState === "processing" &&
        body.p_claim_token === CLAIM_TOKEN;
      if (completed) ledgerState = "sent";
      return Response.json(completed);
    }

    if (url.endsWith("/rpc/fail_care_inquiry_notification_delivery")) {
      const body = JSON.parse(String(init.body)) as Record<string, string>;
      const failed = ledgerState === "processing" && body.p_claim_token === CLAIM_TOKEN;
      if (failed) {
        ledgerState = "failed";
        failedError = body.p_last_error;
      }
      return Response.json(failed);
    }

    if (url === "https://api.resend.com/emails") {
      resendCount += 1;
      lastResendRequest = { url, init };
      return options.providerResponse
        ? await options.providerResponse()
        : Response.json({ id: PROVIDER_MESSAGE_ID });
    }

    return new Response(null, { status: 404 });
  };

  return {
    environment,
    fetcher: fetcher as typeof fetch,
    handler: createHandler({
      fetch: fetcher as typeof fetch,
      getEnv: (name) => environment.get(name),
      logger,
    }),
    logs,
    state: () => ledgerState,
    attemptCount: () => attemptCount,
    resendCount: () => resendCount,
    lastClaimRequest: () => lastClaimRequest,
    lastResendRequest: () => lastResendRequest,
    failedError: () => failedError,
  };
}

function webhookRequest(
  payload: unknown = validPayload,
  options: { method?: string; secret?: string | null; contentType?: string; rawBody?: string } = {},
) {
  const method = options.method ?? "POST";
  const headers = new Headers();
  if (options.contentType !== null) {
    headers.set("Content-Type", options.contentType ?? "application/json; charset=utf-8");
  }
  if (options.secret !== null) {
    headers.set("x-le-minou-webhook-secret", options.secret ?? WEBHOOK_SECRET);
  }

  return new Request("https://function.example/notify-care-inquiry", {
    method,
    headers,
    body: method === "POST" ? options.rawBody ?? JSON.stringify(payload) : undefined,
  });
}

Deno.test("rejects non-POST requests", async () => {
  const harness = createHarness();
  const response = await harness.handler(webhookRequest(undefined, { method: "GET" }));
  assertEquals(response.status, 405);
  assertEquals(response.headers.get("allow"), "POST");
  assertEquals(harness.resendCount(), 0);
});

Deno.test("rejects a missing webhook secret before reading the body", async () => {
  const harness = createHarness();
  const response = await harness.handler(
    webhookRequest(undefined, { secret: null, rawBody: PRIVATE_VALUES.notes }),
  );
  assertEquals(response.status, 401);
  assertEquals(harness.resendCount(), 0);
});

Deno.test("rejects an incorrect webhook secret", async () => {
  const harness = createHarness();
  const response = await harness.handler(webhookRequest(undefined, { secret: "x".repeat(40) }));
  assertEquals(response.status, 401);
  assertEquals(harness.resendCount(), 0);
});

Deno.test("rejects malformed JSON", async () => {
  const harness = createHarness();
  const response = await harness.handler(webhookRequest(undefined, { rawBody: "{" }));
  assertEquals(response.status, 400);
  assertEquals((await response.json()).code, "malformed_json");
});

Deno.test("rejects wrong event, schema, and table payloads", async () => {
  for (
    const payload of [
      { ...validPayload, type: "UPDATE" },
      { ...validPayload, type: "DELETE", record: null, old_record: validPayload.record },
      { ...validPayload, schema: "private" },
      { ...validPayload, table: "other_table" },
    ]
  ) {
    const harness = createHarness();
    const response = await harness.handler(webhookRequest(payload));
    assertEquals(response.status, 422);
    assertEquals(harness.resendCount(), 0);
  }
});

Deno.test("rejects a payload without a valid inquiry UUID", async () => {
  const harness = createHarness();
  const response = await harness.handler(webhookRequest({
    ...validPayload,
    record: { ...validPayload.record, id: "" },
  }));
  assertEquals(response.status, 422);
  assertEquals((await response.json()).code, "invalid_inquiry_reference");
});

Deno.test("rejects events that do not match a stored inquiry UUID and timestamp", async () => {
  for (
    const payload of [
      {
        ...validPayload,
        record: { ...validPayload.record, id: "44444444-4444-4444-8444-444444444444" },
      },
      {
        ...validPayload,
        record: { ...validPayload.record, created_at: "2026-08-30T17:00:01.000Z" },
      },
    ]
  ) {
    const harness = createHarness();
    const response = await harness.handler(webhookRequest(payload));
    assertEquals(response.status, 422);
    assertEquals((await response.json()).code, "inquiry_event_not_found");
    assertEquals(harness.resendCount(), 0);
    assertEquals(harness.state(), "new");
  }
});

Deno.test("fails safely when required environment configuration is missing", async () => {
  const harness = createHarness();
  harness.environment.delete("RESEND_API_KEY");
  const response = await harness.handler(webhookRequest());
  const body = await response.text();
  assertEquals(response.status, 500);
  assert(body.includes("configuration_error"));
  assertStringExcludes(body, [WEBHOOK_SECRET, RESEND_KEY, SUPABASE_SECRET_KEY]);
  assertEquals(harness.resendCount(), 0);
});

Deno.test("a first valid insert sends once with configured recipient and stable idempotency key", async () => {
  const harness = createHarness();
  const response = await harness.handler(webhookRequest());
  assertEquals(response.status, 200);
  assertEquals(harness.resendCount(), 1);
  assertEquals(harness.state(), "sent");

  const claimRequest = harness.lastClaimRequest();
  assert(claimRequest);
  const claimHeaders = new Headers(claimRequest.init.headers);
  assertEquals(claimHeaders.get("apikey"), SUPABASE_SECRET_KEY);
  assertEquals(claimHeaders.get("authorization"), null);
  assertEquals(JSON.parse(String(claimRequest.init.body)), {
    p_inquiry_id: INQUIRY_ID,
    p_inquiry_created_at: validPayload.record.created_at,
  });

  const resendRequest = harness.lastResendRequest();
  assert(resendRequest);
  const headers = new Headers(resendRequest.init.headers);
  assertEquals(headers.get("idempotency-key"), `care-inquiry/${INQUIRY_ID}`);
  assertEquals(headers.get("authorization"), `Bearer ${RESEND_KEY}`);
  const email = JSON.parse(String(resendRequest.init.body)) as Record<string, unknown>;
  assertEquals(email.to, ["configured-owner@example.com"]);
  assertEquals(email.from, "Le Minou <care@example.org>");

  const serializedEmail = JSON.stringify(email);
  assertStringExcludes(serializedEmail, Object.values(PRIVATE_VALUES));
  assertStringExcludes(serializedEmail, [WEBHOOK_SECRET, SUPABASE_SECRET_KEY, RESEND_KEY]);
});

Deno.test("HTML-escapes every row-derived value used by the email builder", () => {
  const content = buildEmailContent({
    inquiryId: "<reference&\"'>",
    receivedAt: "<timestamp&\"'>",
    receivedAtForClaim: "<timestamp&\"'>",
  }, "https://example.com/review?a=1&b=2");

  assert(content.html.includes("&lt;reference&amp;&quot;&#39;&gt;"));
  assert(content.html.includes("&lt;timestamp&amp;&quot;&#39;&gt;"));
  assert(content.html.includes("a=1&amp;b=2"));
  assertEquals(escapeHtml("<&>\"'"), "&lt;&amp;&gt;&quot;&#39;");
});

Deno.test("an already-sent ledger record returns success without resending", async () => {
  const harness = createHarness({ initialState: "sent" });
  const response = await harness.handler(webhookRequest());
  assertEquals(response.status, 200);
  assertEquals((await response.json()).code, "already_sent");
  assertEquals(harness.resendCount(), 0);
});

Deno.test("concurrent duplicate deliveries do not send twice", async () => {
  let releaseProvider!: () => void;
  let markProviderStarted!: () => void;
  const providerStarted = new Promise<void>((resolve) => {
    markProviderStarted = resolve;
  });
  const providerGate = new Promise<void>((resolve) => {
    releaseProvider = resolve;
  });

  const harness = createHarness({
    providerResponse: async () => {
      markProviderStarted();
      await providerGate;
      return Response.json({ id: "55555555-5555-4555-8555-555555555555" });
    },
  });

  const first = harness.handler(webhookRequest());
  await providerStarted;
  const duplicate = await harness.handler(webhookRequest());
  assertEquals(duplicate.status, 202);
  assertEquals((await duplicate.json()).code, "processing");
  assertEquals(harness.resendCount(), 1);

  releaseProvider();
  const firstResponse = await first;
  assertEquals(firstResponse.status, 200);
  assertEquals(harness.resendCount(), 1);
});

Deno.test("provider acceptance with a failed ledger completion stays fenced", async () => {
  const harness = createHarness({ completeSucceeds: false });

  const first = await harness.handler(webhookRequest());
  assertEquals(first.status, 502);
  assertEquals((await first.json()).code, "ledger_finalize_failed");
  assertEquals(harness.state(), "processing");
  assertEquals(harness.resendCount(), 1);

  const immediateRetry = await harness.handler(webhookRequest());
  assertEquals(immediateRetry.status, 202);
  assertEquals((await immediateRetry.json()).code, "processing");
  assertEquals(harness.resendCount(), 1);
});

Deno.test("a provider non-2xx records a sanitized failure and returns non-2xx", async () => {
  const harness = createHarness({
    providerResponse: () =>
      new Response(
        JSON.stringify({ error: `${PRIVATE_VALUES.email} ${WEBHOOK_SECRET}` }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      ),
  });
  const response = await harness.handler(webhookRequest());
  const responseBody = await response.text();

  assertEquals(response.status, 502);
  assertEquals(harness.state(), "failed");
  assertEquals(harness.failedError(), "provider_unavailable");
  assertStringExcludes(responseBody, [PRIVATE_VALUES.email, WEBHOOK_SECRET, RESEND_KEY]);
});

Deno.test("a failed attempt can be retried within the documented provider window", async () => {
  let providerAttempt = 0;
  const harness = createHarness({
    providerResponse: () => {
      providerAttempt += 1;
      return providerAttempt === 1
        ? new Response(null, { status: 500 })
        : Response.json({ id: "66666666-6666-4666-8666-666666666666" });
    },
  });

  const first = await harness.handler(webhookRequest());
  assertEquals(first.status, 502);
  assertEquals(harness.state(), "failed");

  const retry = await harness.handler(webhookRequest());
  assertEquals(retry.status, 200);
  assertEquals(harness.state(), "sent");
  assertEquals(harness.resendCount(), 2);
  assertEquals(harness.attemptCount(), 2);
});

Deno.test("logs and returned errors exclude secrets and inquiry PII", async () => {
  const harness = createHarness({ providerResponse: () => new Response(null, { status: 400 }) });
  const response = await harness.handler(webhookRequest());
  const combinedOutput = `${await response.text()}\n${JSON.stringify(harness.logs)}`;

  assertStringExcludes(combinedOutput, [
    ...Object.values(PRIVATE_VALUES),
    WEBHOOK_SECRET,
    RESEND_KEY,
    SUPABASE_SECRET_KEY,
    "configured-owner@example.com",
    "care@example.org",
  ]);
});
