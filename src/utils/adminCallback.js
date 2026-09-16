// Some email links use Supabase's Site URL instead of the requested /admin redirect.
export function adminCallbackPath(location) {
  if (location.pathname !== "/") return null;
  const fragment = new URLSearchParams(location.hash.slice(1));
  const query = new URLSearchParams(location.search);
  if (fragment.get("type") === "recovery") return null;
  const hasSession = fragment.has("access_token") && fragment.has("refresh_token");
  if (!hasSession && !query.get("code")) return null;
  return `/admin${location.search}${location.hash}`;
}
