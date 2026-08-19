import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

export function useAuthUser() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (!active) return;
      if (import.meta.env.DEV && error) console.error("Auth session check failed", error);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
