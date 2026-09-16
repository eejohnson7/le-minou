import { createClient } from "@supabase/supabase-js";
import { adminCallbackPath } from "./adminCallback";

// Move before the auth client consumes the callback and clears its URL tokens.
if (typeof window !== "undefined") {
  const callback = adminCallbackPath(window.location);
  if (callback) window.history.replaceState(window.history.state, "", callback);
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;
