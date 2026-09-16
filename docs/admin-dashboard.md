# Admin dashboard

Open `/admin` to sign in, review requests, and change their status. There is no signup screen.

## Live setup

1. Apply `supabase/migrations/20260916202300_admin_care_requests.sql` to the Le Minou project after the existing migrations.
2. Create your account in Supabase **Authentication > Users**, or use your existing account. Copy its user UUID.
3. In the trusted SQL editor, add your account:

   ```sql
   insert into public.admin_members(user_id) values ('YOUR_USER_UUID');
   ```

4. Keep public signup disabled in Supabase Auth. Confirm the deployment has the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, then deploy the app.
5. In Supabase **Authentication > URL Configuration**, allow your site’s `/admin` URL as a redirect (and your local `/admin` URL for development). Keep the magic-link email template using `{{ .ConfirmationURL }}`.
6. Open `/admin`, enter your existing account email, and follow the emailed sign-in link. Verify a normal client account sees “This account doesn’t have admin access.”

Email sign-in uses existing accounts only (`shouldCreateUser: false`). The dashboard never creates accounts or grants membership. To remove access, delete the account's row from `admin_members` in the trusted SQL editor.

## Behavior

Requests are filtered by status, newest first, in pages of 25. Open a request to see its details. “Save status” edits only its status. A concurrent status change causes a save error rather than overwriting another update; reopen to load the latest version.

The migration maps old `closed` requests to `declined`. Review those after setup if any need another status. “Confirmed” is a request status; this dashboard does not create bookings, reserve dates, or send email.

Public request inserts and the existing notification code remain in place. The migration also permits the new `60-MINUTE DOG WALK` option and up to four selected services.

## Verification

`supabase/tests/admin_access.sql` is a transactional SQL test for a disposable migrated database. Run it with `psql -v ON_ERROR_STOP=1 -f supabase/tests/admin_access.sql` against that database. It checks anonymous and client access, public inserts, self-promotion denial, all status updates, invalid statuses, column restrictions, deletion denial, and membership revocation. Fixtures roll back.

Do not run synthetic inserts in production: existing INSERT webhooks may send notifications even when a test transaction rolls back.
