# Auth and client-access decision

## Current branch behavior

- `/sign-in` is the only account action linked from the public navigation.
- Prospective clients are directed from Sign In to `/request-care`.
- `/create-account` no longer renders a signup form. It explains that public account creation is unavailable and offers Request Care or Sign In.
- The existing `SignUp.jsx` and `useSignUp.js` implementation remain in the repository for reference, but no route imports or renders them.

## Supabase configuration observed during this audit

The project does not version Supabase Auth settings in `supabase/config.toml` or an auth migration. A read-only check of the configured project reported:

- email/password auth enabled;
- new signups enabled (`disable_signup: false`);
- email auto-confirm enabled (`mailer_autoconfirm: true`).

This means removing the browser route fixes the public product experience, but it does not by itself disable the Supabase signup API. Anyone who deliberately calls the public Auth endpoint can still create an immediately confirmed Auth user. Because `ProtectedRoute` checks only for an authenticated session, that user could reach the client shell even without an accepted-client record.

## Legacy signup risks

The retained signup code performs two separate client-side operations:

1. create an `auth.users` identity with `auth.signUp()`;
2. insert the matching row into the public `user` table.

Those operations are not atomic. Auth creation can succeed while the profile insert fails, leaving a partial account. The implementation also assumes `data.user` exists and navigates to `/profile` without checking `data.session`. That happens to work with the current auto-confirm setting, but would fail if email confirmation were enabled later. Duplicate and retry behavior is also dependent on the project’s confirmation setting.

## Recommended accepted-client onboarding

Eventually, use Supabase’s admin invitation flow only from the Dashboard or a trusted server/Edge Function, never from the browser. Pair it with a tested database trigger or trusted server transaction that creates the application profile for every invited Auth user. Once that path is ready, disable public new-user signup in Supabase Auth settings and verify that invitations still create complete client records.

Until then, keep account setup manual and do not route visitors to the retained signup implementation.
