import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export function useAdminAccess() {
  const [access, setAccess] = useState({ state: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    let revision = 0;
    async function check(session) {
      const current = ++revision;
      if (!active) return;
      if (!session) { setAccess({ state: "signed-out" }); return; }
      setAccess({ state: "loading", userId: session.user.id });
      try {
        const { data, error } = await supabase.rpc("is_admin");
        if (error) throw error;
        if (active && current === revision) setAccess({
          state: data === true ? "allowed" : "denied", userId: session.user.id
        });
      } catch {
        if (active && current === revision) setAccess({ state: "error", userId: session.user.id });
      }
    }
    if (!supabase) {
      Promise.resolve().then(() => { if (active) setAccess({ state: "unconfigured" }); });
      return () => { active = false; };
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Run database calls after the auth callback releases its lock.
      const current = ++revision;
      if (active) setAccess({ state: "loading", userId: session?.user.id });
      setTimeout(() => { if (active && current === revision) check(session); }, 0);
    });
    const initialRevision = revision;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active || revision !== initialRevision) return;
      if (error) setAccess({ state: "error" });
      else check(data.session);
    }).catch(() => { if (active && revision === initialRevision) setAccess({ state: "error" }); });
    return () => { active = false; revision++; subscription.unsubscribe(); };
  }, [attempt]);
  return { ...access, retry: () => setAttempt(value => value + 1) };
}
