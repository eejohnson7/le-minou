import { useCallback, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

const SIGN_IN_ERROR = "We couldn’t sign you in with those details. Check your email and password and try again.";

export function useSignIn(returnTo = "/profile") {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inFlight = useRef(false);

  const clearError = useCallback(() => setErrorMsg(""), []);

  const signIn = async (email, password) => {
    if (inFlight.current) return false;

    inFlight.current = true;
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) throw error;

      navigate(returnTo, { replace: true });
      return true;
    } catch (error) {
      if (import.meta.env.DEV) console.error("Sign in failed", error);
      setErrorMsg(SIGN_IN_ERROR);
      return false;
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  return { signIn, loading, errorMsg, clearError };
}
