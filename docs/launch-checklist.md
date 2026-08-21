# Public launch checklist

The production Supabase project was not connected while preparing this branch. Complete these checks against the real Le Minou project before launch.

## Environment and deployment

- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` in the production deployment environment.
- [ ] Confirm no service-role or secret key is present in frontend environment variables or the deployed bundle.
- [ ] Deploy to Vercel and smoke-test `/`, `/services`, `/about`, `/request-care`, an unknown URL, and direct-route refreshes.

## Care inquiries

- [ ] Apply `supabase/migrations/20260818052743_create_care_inquiry.sql` to the real Le Minou Supabase project.
- [ ] Confirm `public.care_inquiry` is exposed to the Data API with only the explicit grants in the migration.
- [ ] With the anonymous/publishable key, verify an inquiry insert succeeds.
- [ ] With the anonymous/publishable key, verify select, update, and delete attempts fail.
- [ ] Run Supabase Security Advisor and resolve relevant findings.
- [ ] Confirm who reviews new inquiries, where they are reviewed, and how response ownership is tracked.
- [ ] Add basic spam protection or rate limiting after launch if abuse becomes an issue; this branch does not add it.

## Client access

- [ ] Disable public signup before exposing any authentication entry point.
- [ ] Set the production site URL and review every authorized redirect URL in Supabase Auth.
- [ ] Keep client profile, pet, photo-library, and booking routes private until `client-access-foundation` is ready.
