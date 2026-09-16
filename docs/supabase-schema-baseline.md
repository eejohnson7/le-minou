# Supabase schema baseline

## Snapshot date, repository commit, project reference and inspection method

- Snapshot: 2026-09-14 (America/Chicago)
- Repository commit: `d2aeae9297b77e7ff40ca36a871f9e77837906f1`
- Branch: `codex/client-data-foundation`
- Supabase project: `jbyqsbjnqrqllvbmgxbx` (`Le Minou`, `us-east-2`, PostgreSQL 17.6)
- Method: committed files under `supabase/`; authenticated Supabase metadata APIs; and read-only catalog queries against `pg_namespace`, `pg_class`, `pg_attribute`/information schema, `pg_constraint`, `pg_indexes`, `pg_policies`, `pg_proc`, privilege functions, and sanitized `pg_trigger` flags. Only aggregate Storage counts and structural path classifications were read. No application rows, object names, trigger definitions/arguments, webhook payloads, Vault data, keys, connection strings, or secrets were retrieved.

## Executive summary

Production has two application-owned tables in `public`, three application RPCs, one application trigger, one deployed Edge Function, three private Storage buckets, and four application Storage policies. Both `public` tables have RLS enabled. The repository's two migration versions exactly match the two production migration-history entries and describe the tables, constraints, public-table policy, grants, and RPCs.

Production also contains dashboard- or out-of-band-managed objects absent from committed migrations: all three Storage buckets, all Storage policies, the `care_inquiry` webhook trigger, and a `public.rls_auto_enable()` event-trigger function. These must be assigned an owner and captured reproducibly before the Phase 2 household model depends on them. There is no household, profile, pet, membership, booking, or availability table in `public`; therefore the household model cannot be inferred from production.

## Local migration inventory

| Version | File | Objects |
|---|---|---|
| `20260818052743` | `supabase/migrations/20260818052743_create_care_inquiry.sql` | `public.care_inquiry`; RLS; restricted column-level INSERT for `anon` and `authenticated`; service-role table access; public-inquiry INSERT policy |
| `20260830173559` | `supabase/migrations/20260830173559_create_care_inquiry_notification_delivery.sql` | Private delivery ledger; FK; RLS; three service-only, security-invoker RPCs |

`supabase/config.toml` declares `[functions.notify-care-inquiry] verify_jwt = false`. The function source validates a separate webhook secret, validates a narrow INSERT event shape, uses a Supabase secret key only server-side to call the three ledger RPCs, and sends a minimal notification through Resend. Environment-variable names are visible in source; values were not inspected.

## Live schema inventory

Application-owned schema inventory:

- `public`: two ordinary tables and four functions listed below.
- `storage`: Supabase-managed service tables plus three application buckets and application policies on `storage.objects`.
- `supabase_functions`: application webhook trigger function target (`http_request`); only sanitized trigger linkage was inspected.

Platform-managed schemas present, but not treated as Le Minou application schema: `auth`, `extensions`, `graphql`, `graphql_public`, `net`, `realtime`, `storage`, `supabase_functions`, `supabase_migrations`, and `vault`. Their internal objects are owned by Supabase and were not dumped. Vault contents were not queried.

At snapshot time, safe metadata reported two rows in each public application table. These are the retained synthetic inquiry and notification-verification records documented in the production verification checkpoint. This aggregate is recorded only to distinguish the schema baseline from a data migration plan; no row contents were inspected.

## Tables, columns, constraints, relationships and indexes

### `public.care_inquiry`

RLS enabled, not forced. All columns are ordinary stored columns (none generated).

| Column | Type | Null | Default | Constraints/meaning |
|---|---|---:|---|---|
| `id` | `uuid` | no | `gen_random_uuid()` | Primary key |
| `created_at` | `timestamptz` | no | `now()` | — |
| `full_name` | `text` | no | — | Trimmed length 1–120 |
| `email` | `text` | no | — | Trimmed length 3–254 and contains `@` after first character |
| `phone` | `text` | yes | — | At most 40 characters when present |
| `neighborhood_or_zip` | `text` | no | — | Trimmed length 1–120 |
| `pet_type` | `text` | no | — | `cat`, `dog`, or `both` |
| `pet_count` | `smallint` | no | — | 1–20 |
| `pet_names` | `text` | yes | — | At most 250 characters |
| `services` | `text[]` | no | — | 1–3 values, limited to `30-MINUTE VISIT`, `60-MINUTE VISIT`, `DOG WALK` |
| `timing_type` | `text` | no | — | `specific_dates`, `recurring`, or `not_sure` |
| `start_date` | `date` | yes | — | Required only for `specific_dates` |
| `end_date` | `date` | yes | — | Required only for `specific_dates`; not before start |
| `recurring_schedule` | `text` | yes | — | Required only for `recurring`; trimmed length 1–500 |
| `pet_routine_notes` | `text` | no | — | Trimmed length 1–4000 |
| `status` | `text` | no | `'new'` | `new`, `contacted`, or `closed` |

The timing-details check makes the three timing modes mutually exclusive. The only index is the primary-key unique btree index `care_inquiry_pkey (id)`.

### `public.care_inquiry_notification_delivery`

RLS enabled, not forced. All columns are ordinary stored columns (none generated).

| Column | Type | Null | Default | Constraints/meaning |
|---|---|---:|---|---|
| `inquiry_id` | `uuid` | no | — | Primary key and FK to `care_inquiry.id` |
| `state` | `text` | no | `'processing'` | `processing`, `sent`, or `failed` |
| `attempt_count` | `integer` | no | `1` | Greater than zero |
| `claim_token` | `uuid` | no | `gen_random_uuid()` | — |
| `processing_started_at` | `timestamptz` | no | `now()` | — |
| `provider_message_id` | `uuid` | yes | — | Present only when sent |
| `last_error` | `text` | yes | — | Length 1–120 when present; required only when failed |
| `manual_retry_approved_at` | `timestamptz` | yes | — | Manual-review retry marker |
| `created_at` | `timestamptz` | no | `now()` | First claim time; retry-window anchor |
| `updated_at` | `timestamptz` | no | `now()` | — |
| `sent_at` | `timestamptz` | yes | — | Present only when sent |

The state-fields check enforces the allowed combinations of state, provider ID, sent time, error, and manual approval. Relationship: exactly zero-or-one delivery row per inquiry; FK update action `NO ACTION`, delete action `CASCADE`; not deferrable. The only index is the primary-key unique btree index `care_inquiry_notification_delivery_pkey (inquiry_id)`.

No additional public unique constraints or indexes exist. Storage service-table constraints and indexes are platform-managed; relevant relationships are `storage.objects.bucket_id -> storage.buckets.id` (`NO ACTION`), multipart uploads to buckets (`NO ACTION`), multipart parts to uploads (`ON DELETE CASCADE`), and vector indexes to vector buckets (`NO ACTION`).

## RLS and policies

All two public tables and all inspected Storage service tables have RLS enabled and not forced.

| Table | Policy | Command / roles | `USING` | `WITH CHECK` |
|---|---|---|---|---|
| `public.care_inquiry` | Public visitors can create new care inquiries | INSERT / `anon`, `authenticated` | — | `status = 'new'` |
| `storage.objects` | User can read own pet photos | SELECT / `authenticated` | bucket `pet-photos` and first folder segment equals `auth.uid()` text | — |
| `storage.objects` | User can upload own pet photo | INSERT / `authenticated` | — | bucket `pet-photos` and first folder segment equals `auth.uid()` text |
| `storage.objects` | User can read own profile photos | SELECT / `authenticated` | bucket `profile-photos` and first folder segment equals `auth.uid()` text | — |
| `storage.objects` | User can upload own profile photo | INSERT / `authenticated` | — | bucket `profile-photos` and first folder segment equals `auth.uid()` text |

All are permissive policies. `care_inquiry_notification_delivery` has no policies, intentionally leaving it service-only. There are no UPDATE or DELETE Storage policies and no policy at all for `photo-library`.

## Grants and function/RPC exposure

All three application roles (`anon`, `authenticated`, `service_role`) have `USAGE`, but not `CREATE`, on `public` and `storage`.

- `care_inquiry`: `anon` and `authenticated` have INSERT only on the 13 user-supplied columns (`full_name`, `email`, `phone`, `neighborhood_or_zip`, `pet_type`, `pet_count`, `pet_names`, `services`, `timing_type`, `start_date`, `end_date`, `recurring_schedule`, `pet_routine_notes`). They cannot supply `id`, `created_at`, or `status`, and have no SELECT/UPDATE/DELETE. `service_role` has full effective table and column access.
- `care_inquiry_notification_delivery`: `anon` and `authenticated` have no effective table or column privileges. `service_role` has SELECT/INSERT/UPDATE (and effective owner-like broader privileges through its platform role); application code uses only the granted operations.
- Storage tables carry Supabase platform grants and rely on RLS for row enforcement. Direct grants alone must not be interpreted as application authorization.

Application RPCs:

| Signature | Returns | Security / search path | Execution exposure |
|---|---|---|---|
| `claim_care_inquiry_notification_delivery(uuid, timestamptz)` | table of claim status/token/count | invoker; `search_path = ''`; volatile; owner `postgres` | `service_role` only |
| `complete_care_inquiry_notification_delivery(uuid, uuid, uuid)` | `boolean` | invoker; `search_path = ''`; volatile; owner `postgres` | `service_role` only |
| `fail_care_inquiry_notification_delivery(uuid, uuid, text)` | `boolean` | invoker; `search_path = ''`; volatile; owner `postgres` | `service_role` only |

All explicitly deny EXECUTE to `PUBLIC`, `anon`, and `authenticated`; none is security definer. Production also has unexplained `public.rls_auto_enable()` returning `event_trigger`: PL/pgSQL, volatile, `SECURITY DEFINER`, owner `postgres`, `search_path=pg_catalog`, and effective EXECUTE visible to PUBLIC/anon/authenticated/service role. It backs the enabled `ensure_rls` event trigger, which runs at `ddl_command_end` for `CREATE TABLE`, `CREATE TABLE AS`, and `SELECT INTO`. Event-trigger invocation is not the same as an ordinary RPC call, but placement and grants are unexplained and should be reviewed. Six other event triggers are extension/PostgREST platform objects in the `extensions` schema.

## Sanitized trigger and Edge Function integration metadata

- Application trigger `public.care_inquiry.notify-care-inquiry`: enabled, AFTER INSERT, FOR EACH ROW; target function `supabase_functions.http_request`. Its definition, arguments, headers, and request values were deliberately not queried.
- Supabase-managed Storage triggers observed: `enforce_bucket_name_length_trigger` (BEFORE INSERT/UPDATE, row); `protect_buckets_delete` (BEFORE DELETE, statement); `protect_objects_delete` (BEFORE DELETE, statement); `update_objects_updated_at` (BEFORE UPDATE, row).
- Deployed Edge Function `notify-care-inquiry`: active, version 11, JWT verification disabled. The repository matches that setting and implements separate shared-secret authentication. The deployed bundle hash was observed only as opaque deployment metadata and is not sufficient to prove byte-for-byte equality with local source.
- No notification was invoked and no webhook state was changed.

## Storage buckets, paths and policies

| Bucket | Public | Limits | Safe path evidence at snapshot | Policy coverage |
|---|---:|---|---|---|
| `pet-photos` | no | no bucket-level size/MIME limit set | 3 objects; two folder levels; first segment shaped as UUID | authenticated owner-folder SELECT + INSERT |
| `profile-photos` | no | no bucket-level size/MIME limit set | 4 objects; 3 with a UUID-shaped first folder segment, 1 at bucket root | authenticated owner-folder SELECT + INSERT; root object does not match these policies |
| `photo-library` | no | no bucket-level size/MIME limit set | 0 objects | no application policy |

Only structural classifications and aggregate counts were captured; no object key, filename, metadata, owner identifier, or content was read. The evidenced convention is `<auth-user-uuid>/...` for protected pet/profile assets. The extra pet-photo path level is not semantically identifiable from metadata. There is no evidence yet for a household-scoped path convention.

## Production-versus-repository reconciliation

| Area | Production | Repository | Reconciliation |
|---|---|---|---|
| Migration history | Two entries: `20260818052743`, `20260830173559` | Same versions and names | Matched |
| Public tables/constraints/RPCs/public policy | Present | Defined by the two migrations | Matched in inspected metadata |
| Edge Function | Active version 11; `verify_jwt=false` | Function source and matching config | Configuration matches; deployed-source equality not proven |
| Care-inquiry trigger | Present | No migration/config declaration | Production-only / dashboard-managed |
| Storage buckets | Three private buckets | No bucket creation/config | Production-only |
| Storage policies | Four policies | No policy migrations | Production-only |
| `public.rls_auto_enable()` | Present | Absent | Unexplained production object |

The repository therefore reproduces the two core tables but not the complete live security/integration model.

## Legacy and ambiguous ownership findings

- `pet-photos`, `profile-photos`, and `photo-library` predate the committed schema history or were managed out of band. Their intended product owner and lifecycle are not documented.
- Storage authorization is user-UUID-scoped, while Phase 2 calls for a household model. Whether household members share files, and whether paths migrate or remain user-owned, is undecided.
- The root-level `profile-photos` object is outside the evidenced policy convention. Its provenance and retention decision are unknown; no deletion or backfill is proposed.
- `photo-library` is private, empty, and has no policies. It may be reserved, legacy, or service-only.
- `public.rls_auto_enable()` is security definer, public-schema, and absent from migrations. Its creating extension/tool, associated event trigger, necessity, and privilege rationale require confirmation.
- The database webhook trigger is not source-controlled. Ownership of its endpoint/header configuration must be established without exporting secrets.

## Unknowns, decision gates and recommended next steps

1. Define the Phase 2 ownership model: household, member roles, invitation lifecycle, and whether a user can belong to multiple households.
2. Decide whether inquiries become clients/households and by what explicit, auditable workflow. Do not infer or backfill this relationship.
3. Decide whether pets and media are household-owned or user-owned; then specify path format, authorization predicates, update/delete behavior, and migration treatment for existing objects.
4. Identify owners and intended consumers for all three buckets, the root profile object, and `photo-library`.
5. Attribute and review `rls_auto_enable()` and its event trigger. Restrict/remove it only in a separately reviewed migration if proven unnecessary; no action was taken here.
6. Source-control the bucket definitions, Storage policies, and sanitized webhook creation in idempotent migrations or documented deployment automation. Keep webhook secrets out of SQL and version control.
7. Confirm the deployed Edge Function bundle corresponds to the repository version through an approved deployment provenance check, not by exposing secret configuration.
8. After decisions 1–4, design the household/client schema and RLS threat model as the next task.

## Verification evidence

- Read-only catalog checklist completed for application schemas/tables/columns/defaults/nullability/generated state; PK/FK/unique/check constraints; relationship actions; indexes; RLS/policies; schema/table/column/function privileges; function signatures/security/search paths; sanitized non-internal triggers; buckets/path aggregates/Storage policies; Edge Function metadata; and migration history.
- Production mutation APIs were not used. No migration, DDL, DML, function invocation, notification, deployment, secret operation, webhook change, or Storage operation was performed.
- Metadata results were reconciled against both committed migrations and `supabase/config.toml`.
- The final changed-file secret/PII scan, `git diff --check`, and status check are recorded in the completion report for this change.
