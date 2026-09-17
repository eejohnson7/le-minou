# Care request emails

Each new request sends two separate emails:

- **Erin:** client name, email, pet names, pets, services, dates or schedule, and the private admin link.
- **Client:** the same request summary and a short receipt explaining that the booking is not confirmed yet. No admin link is included.

Replies to Erin’s notification go to the client. Replies to the client’s receipt go to Erin. There is no CC or BCC. Pet names are optional on the form; missing names appear as “Not provided.” Phone numbers, addresses, care notes, and access information are not included.

## Activate this update

The existing webhook, verified Resend domain, and secrets can stay as configured.

1. Apply `supabase/migrations/20260917021936_client_inquiry_confirmation.sql` in the Supabase SQL editor for the Le Minou project, or through the linked CLI migration workflow.
2. Deploy the updated function:

   ```sh
   supabase functions deploy notify-care-inquiry --no-verify-jwt --project-ref jbyqsbjnqrqllvbmgxbx
   ```

3. Deploy the site to publish the optional pet names field.
4. Submit a new test request using an email address you control. Check that both inboxes receive one email, the details match, and the client receipt has no admin link.

Do not replay older inquiries to test the update: requests without a client delivery record would send a new receipt to those clients. Reconcile any unresolved owner notification attempts before rollout, since the owner email content has changed and Resend rejects changed payloads for an existing idempotency key.

Existing secrets:

- `INQUIRY_TO_EMAIL`: `admin@leminou-chi.com`
- `INQUIRY_FROM_EMAIL`: `notifications@leminou-chi.com`
- `INQUIRY_REVIEW_URL`: `https://leminou-chi.com/admin`
- `RESEND_API_KEY` and `INQUIRY_WEBHOOK_SECRET`: keep existing values.

`SUPABASE_URL` and the default entry in `SUPABASE_SECRET_KEYS` are supplied by the hosted function environment. Never put secret keys in browser code or source control.

## Access and delivery

The INSERT-only database webhook invokes the function with `x-le-minou-webhook-secret`. Platform JWT verification is disabled only for this function; the custom secret remains mandatory. Email failures do not remove requests or change the public form’s success state.

The function reads only the required summary fields from the stored inquiry after verifying its UUID and creation timestamp. Webhook-supplied contact details are ignored. HTML values are escaped. Logs contain operational codes, inquiry IDs, audience, and attempt counts, without client details or keys.

The owner ledger remains `care_inquiry_notification_delivery`. The new client ledger is `care_inquiry_client_confirmation_delivery`. Both have RLS enabled, no browser policies, and no table or RPC privileges for visitors or signed-in clients. Only `service_role` can use their security-invoker delivery RPCs. The ledgers store delivery metadata, not email bodies or duplicated client details.

Each audience has an independent claim and stable Resend key:

- Owner: `care-inquiry/<inquiry-id>`
- Client: `care-inquiry-confirmation/<inquiry-id>`

A successful email is skipped on retries even if the other email failed. Concurrent sends are fenced with claim tokens. Fresh processing claims return `202`; sent claims are skipped. Failed or stale claims can retry inside 23 hours of the first attempt, within Resend’s 24-hour idempotency window. Older ambiguous attempts require manual review and return `409`.

For manual review, check Resend’s delivery history first. If an email was accepted, reconcile its ledger to `sent` rather than resending. Only after confirming no accepted email, set `manual_retry_approved_at = now()` on the relevant failed or stale ledger record, then replay that event once. Do not change recipients, sender, or content while an attempt is unresolved.

## Checks

From `supabase/functions/notify-care-inquiry`:

```sh
deno fmt --check
deno task check
deno task lint
deno task test
```

Tests mock Supabase and Resend; they do not send real emails. They cover authenticated webhook access, stored contact details, both recipients, partial failures, duplicates, retries, HTML escaping, and safe logs.

From the repository root, run `npm run build`, `npm test`, and `npm run check:imports`. Use the Supabase function logs, the relevant private delivery ledger, and Resend Email Logs to investigate delivery. Avoid copying webhook bodies or headers into logs or support messages.

References: [Supabase webhooks](https://supabase.com/docs/guides/database/webhooks), [function secrets](https://supabase.com/docs/guides/functions/secrets), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
