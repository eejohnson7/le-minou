import { useCallback, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";

const RESET_REQUEST_ERROR = "We couldn’t send reset instructions just now. Please try again.";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sent, setSent] = useState(false);
  const inFlight = useRef(false);

  const clearError = useCallback(() => setErrorMsg(""), []);

  const sendReset = async (email) => {
    if (inFlight.current) return false;

    inFlight.current = true;
    setLoading(true);
    setErrorMsg("");

    try {
      const redirectTo = new URL("/reset-password", window.location.origin).toString();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });

      if (error) throw error;

      setSent(true);
      return true;
    } catch (error) {
      if (import.meta.env.DEV) console.error("Password reset request failed", error);
      setErrorMsg(RESET_REQUEST_ERROR);
      return false;
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  return { sendReset, loading, errorMsg, sent, clearError };
}
