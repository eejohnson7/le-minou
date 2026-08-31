# Care inquiry email notifications

This phase sends one minimal internal email after a valid row is inserted into
`public.care_inquiry`. It does not change the public Request Care form, expose inquiry rows,
or make notification delivery part of the visitor-facing success state.

## Architecture and trust boundaries

1. The public browser uses the configured Supabase **publishable** key. RLS permits only the
   existing allowlisted `care_inquiry` insert columns.
2. A Supabase Database Webhook observes `INSERT` on `public.care_inquiry` after the row has
   been stored. Database Webhooks use asynchronous `pg_net`, so email work does not roll back
   or delete the inquiry.
3. The webhook sends the generated database payload to the `notify-care-inquiry` Edge
   Function. Platform JWT verification is disabled for this function because a Database
   Webhook has no user JWT. The function instead requires the application-specific
   `x-le-minou-webhook-secret` header and rejects a missing or mismatched value before reading
   the body.
4. The function validates the event envelope, then requires the inquiry UUID and `created_at`
   to match the stored `care_inquiry` row before claiming delivery. It uses the
   platform-provided `SUPABASE_SECRET_KEYS` default secret key to call three narrowly granted
   ledger RPCs. The secret key is sent only in the Supabase Data API `apikey` header, not as a
   bearer token.
5. An atomic database claim decides whether this invocation may send. The function then calls
   the Resend HTTPS API with the configured sending-only key and a stable non-PII idempotency
   key.
6. Resend sends the internal email. The function records only delivery state, Resend's
   UUID-format provider message ID, and a short controlled error code in the private ledger.

The webhook secret authenticates only this webhook and is intentionally lower privilege than
a Supabase secret/service-role key. Never add a publishable key, secret key, service-role key,
or Resend key to the webhook headers.

## Repository artifacts

- `supabase/migrations/20260830173559_create_care_inquiry_notification_delivery.sql` creates
  the private delivery ledger and its claim/finalize RPCs.
- `supabase/functions/notify-care-inquiry/` contains the handler and focused unit tests.
- `supabase/config.toml` sets `verify_jwt = false` only for `notify-care-inquiry`; custom
  webhook authentication remains mandatory in the handler.

## Secrets and sender prerequisites

Create these only after code and migration review:

1. Create a Resend account and a sending-only API key.
2. Add and verify a domain owned by Le Minou in Resend. Do not use an unverified arbitrary
   sender in production.
3. Choose an `INQUIRY_FROM_EMAIL` at that verified domain.
4. Generate a cryptographically random `INQUIRY_WEBHOOK_SECRET` of at least 32 bytes.
5. Set the following Edge Function secrets in **Supabase Dashboard > Edge Functions >
   Secrets** or with `supabase secrets set --env-file <UNTRACKED_ENV_FILE>`:

   - `RESEND_API_KEY`
   - `INQUIRY_WEBHOOK_SECRET`
   - `INQUIRY_TO_EMAIL` (set to `leminou.chi@gmail.com`)
   - `INQUIRY_FROM_EMAIL`
   - optional `INQUIRY_REVIEW_URL`

`SUPABASE_URL` and `SUPABASE_SECRET_KEYS` are hosted Edge Function defaults. This repository
uses the current publishable/secret API-key model: browser code uses a publishable key, while
the function parses the `default` entry in `SUPABASE_SECRET_KEYS`. Do not add either default
to a checked-in environment file. Confirm the default secret key exists in the Edge Function
environment before deployment.

`INQUIRY_REVIEW_URL`, when present, must be a credential-free HTTPS URL. Until a secure admin
interface exists, it may point to the appropriate authenticated Supabase Dashboard view. Do
not use a public table URL or a URL containing credentials.

## Migration review and application

The migration is intentionally not applied by this branch. Before applying it:

1. Review the UUID foreign key against the existing `care_inquiry.id uuid` primary key.
2. Start a disposable local Supabase stack and run `supabase db reset`.
3. Run `supabase db lint --local` and `supabase db advisors --local` if supported by the
   installed CLI/runtime.
4. Inspect `supabase migration list --local` and review the generated SQL diff.
5. Link the CLI to the intended project only after independently confirming its project ref.
6. Review the remote migration plan, then apply through the team's normal reviewed migration
   process. Do not apply directly to production from an unreviewed checkout.

The ledger is `public.care_inquiry_notification_delivery` because the Data API serves the
project's exposed schema, but it has RLS enabled, no browser policy, and all privileges revoked
from `PUBLIC`, `anon`, and `authenticated`. Only `service_role` receives `SELECT`, `INSERT`,
and `UPDATE`; it receives no `DELETE`. The three `SECURITY INVOKER` RPCs also revoke execution
from browser roles and grant only `service_role`. Modern Supabase secret keys map server
requests to the same privileged backend role and bypass RLS. Browser code has neither a grant,
a policy, nor a secret key, so it cannot read or write the ledger or execute the RPCs.

The ledger stores no email body and no duplicate inquiry PII. It contains the inquiry UUID,
constrained `processing`/`sent`/`failed` state, attempt count, a fenced claim token, processing
time, optional provider message ID, a short controlled error code, manual-retry approval time,
and created/updated/sent timestamps. Its foreign key cascades only when an inquiry is separately
deleted through an approved data-retention process; notification code never deletes or alters
the inquiry.

## Function deployment

After the migration and secrets are reviewed and applied:

1. Run the formatting, type-check, and unit-test commands below.
2. Deploy only this function with the reviewed project ref:
   `supabase functions deploy notify-care-inquiry --no-verify-jwt --project-ref <PROJECT_REF>`.
3. Confirm the deployed function is marked as not requiring platform JWT verification.
4. Before creating the webhook, invoke it with no secret and an incorrect secret; both must
   return `401`, and the logs must not contain the supplied values.
5. Do not expose this endpoint to browser code or add CORS handling. It is a server-to-server
   webhook endpoint.

## Exact Database Webhook configuration

Create this only after the function, migration, sender domain, and secrets have been reviewed:

- Dashboard area: **Database > Webhooks > Create a new webhook**
- Name: `notify-care-inquiry`
- Schema: `public`
- Table: `care_inquiry`
- Events: `INSERT` only; leave `UPDATE` and `DELETE` disabled
- Method: `POST`
- URL: `https://<PROJECT_REF>.supabase.co/functions/v1/notify-care-inquiry`
- HTTP headers:
  - `Content-Type: application/json`
  - `x-le-minou-webhook-secret: <MATCHING_APPLICATION_SECRET>`

Do not represent this webhook as SQL in this repository. Its hosted URL and application secret
are environment-specific, and forcing them into a migration would put sensitive configuration
in source or migration history.

## Email content and privacy

The subject is `New Le Minou care inquiry`. Plain-text and HTML versions contain only:

- a short statement that a new inquiry was received;
- the inquiry UUID;
- the normalized `created_at` timestamp;
- the optional configured review URL; and
- a direction to review the complete inquiry in the secure Supabase Dashboard.

The function does not include the submitter's name, street/neighborhood/ZIP address, email,
phone, pet names, schedule, services, freeform routine or care notes, veterinarian or medical
details, medications, access information, the full webhook payload, configuration keys, or
internal error details. Every row-derived value used in HTML passes through HTML escaping.
Logs contain only controlled event names, the inquiry UUID, and attempt count.

## Duplicate prevention and retries

The claim RPC first requires the event UUID and timestamp to match the stored inquiry, then
inserts or atomically updates one ledger row per inquiry. A unique primary key on `inquiry_id`
serializes concurrent webhook deliveries. Only the holder of the current random claim token can
mark that attempt sent or failed, preventing an older worker from finalizing a newer claim.

- `sent`: return `200` without another Resend request, including long after Resend's own
  idempotency window has expired.
- fresh `processing`: return `202` without another send.
- `failed`, or `processing` older than 15 minutes: claim another attempt only while the initial
  ledger claim remains inside a conservative 23-hour window; later attempts never extend this
  cutoff.
- an ambiguous record older than 23 hours: return `409 manual_review_required` without
  sending.

Every Resend call uses `Idempotency-Key: care-inquiry/<inquiry-uuid>`. Resend currently retains
idempotency keys for 24 hours. The 23-hour automatic-retry cutoff leaves margin inside that
provider window. Avoid changing recipient, sender, review URL, or email content while an
attempt is unresolved: Resend rejects reuse of one idempotency key with a different payload.

For a retry within 23 hours, re-invoke the same valid INSERT envelope (`type`, `schema`, `table`,
the record UUID and `created_at`, and `old_record: null`) after correcting the
provider/configuration problem. The failed ledger row is claimed again and its attempt count
increments.

For an attempt older than 23 hours:

1. Search Resend by provider message ID, idempotency key, inquiry reference, and timestamp.
2. If Resend accepted or delivered it, reconcile the ledger to `sent`; do not resend.
3. Only if Resend confirms no accepted email, approve one retry in the SQL editor without
   selecting or copying the inquiry row:

   ```sql
   update public.care_inquiry_notification_delivery
   set manual_retry_approved_at = now(), updated_at = now()
   where inquiry_id = '<REVIEWED_INQUIRY_UUID>'
     and state in ('processing', 'failed');
   ```

4. Re-invoke the same event once and confirm the ledger reaches `sent`.

There is an unavoidable distributed-system boundary after Resend accepts a request and before
the final ledger update commits. If that update fails, the function returns non-2xx and leaves
the row `processing`. A retry inside 24 hours is protected by Resend's idempotency result. Once
that window is over, the function requires manual review rather than risking a duplicate.

## Tests and safe production verification

From `supabase/functions/notify-care-inquiry`, run:

```text
deno fmt --check
deno task check
deno task lint
deno task test
```

The tests inject fake environment values, an in-memory ledger, and a mocked Resend endpoint.
They do not use a live Supabase project, modify a live database, or send email.

When Docker is available, start a disposable local stack, apply migrations with
`supabase db reset`, and serve the function with a separate ignored local secret file. Use
`http://host.docker.internal:54321/functions/v1/notify-care-inquiry` for a webhook emitted from
local Postgres. Confirm a local insert remains present when the fake provider returns failure.

For one controlled production test after explicit approval:

1. Use a synthetic inquiry with no real address, contact, medical, access, or care data.
2. Enable the INSERT-only webhook and insert the test inquiry through the existing public form.
3. Confirm exactly one minimal email, one `sent` ledger row, and one provider message ID.
4. Securely re-invoke a minimal event containing only that test row's UUID and `created_at`.
   Confirm `already_sent` and no second Resend message.
5. Remove or close the synthetic inquiry only through the approved data-retention process; do
   not make deletion part of notification testing.

## Observability and incident handling

- **Database Webhook / `pg_net`:** use the Supabase SQL editor and select only operational
  columns. Never select `headers`, `body`, or response `content`, because they can contain the
  webhook secret or inquiry data.

  ```sql
  select id, method, url, timeout_milliseconds
  from net.http_request_queue
  order by id desc
  limit 20;

  select id, status_code, timed_out, error_msg, created
  from net._http_response
  order by created desc
  limit 20;
  ```

- **Edge Function:** Dashboard **Edge Functions > notify-care-inquiry > Logs**. Search by the
  safe inquiry UUID and controlled events such as `notification_claimed`, `notification_sent`,
  `provider_unavailable`, or `manual_review_required`.
- **Ledger:** in the SQL editor, select only delivery columns for the reviewed UUID. Do not join
  to `care_inquiry` merely to troubleshoot mail delivery.
- **Resend:** search the Email Logs by provider message ID or the non-PII idempotency key.

A provider or ledger failure returns non-2xx so it remains visible in webhook/function logs.
The original inquiry remains stored and unchanged even when notification delivery fails.

## Secret rotation

- **Webhook secret:** disable the Database Webhook first, set a newly generated Edge Function
  secret, replace the webhook header with the same new value, test authentication, then
  re-enable the webhook. Review failed invocations during the disabled/mismatch window and
  replay only after checking the ledger.
- **Resend key:** create a new sending-only key, replace `RESEND_API_KEY`, test one approved
  synthetic send, then revoke the old key. Do not change the sender/recipient/content for an
  unresolved idempotent attempt.
- **Supabase secret key:** rotate the named/default key in Supabase according to the project's
  key-rotation procedure and confirm `SUPABASE_SECRET_KEYS` exposes the active default. This
  key is never stored in this repository or in the webhook.

## Rollback

1. Disable the Database Webhook first so no new invocations race the rollback.
2. Inspect the queue, function logs, ledger, and Resend for in-flight attempts without selecting
   request bodies or inquiry PII.
3. Remove or undeploy `notify-care-inquiry` only after pending attempts are reconciled.
4. Keep the ledger temporarily for delivery audit and duplicate protection.
5. If the ledger must be removed, use a separate reviewed rollback migration that drops the
   RPCs before the table. Never drop it while the webhook is enabled or an attempt is unresolved.

The public Request Care insert and success behavior require no rollback because this phase does
not change them.

## Current references

- [Supabase Database Webhooks](https://supabase.com/docs/guides/database/webhooks)
- [Supabase Edge Function authorization headers](https://supabase.com/docs/guides/functions/auth-headers)
- [Supabase Edge Function environment variables](https://supabase.com/docs/guides/functions/secrets)
- [Supabase migration to publishable and secret API keys](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys)
- [Resend with Supabase Edge Functions](https://resend.com/docs/send-with-supabase-edge-functions)
- [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys)
