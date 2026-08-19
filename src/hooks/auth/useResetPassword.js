import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";

const INVALID_LINK_MESSAGE = "This reset link is no longer valid. Request a new link to try again.";
const UPDATE_ERROR_MESSAGE = "We couldn’t update your password just now. Please try again.";

function hasRecoveryIntent(url) {
  const parsedUrl = new URL(url);
  const hashParams = new URLSearchParams(parsedUrl.hash.slice(1));
  return parsedUrl.searchParams.get("type") === "recovery" || hashParams.get("type") === "recovery";
}

export function useResetPassword() {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const recoveryIntent = useRef(hasRecoveryIntent(window.location.href));

  const clearError = useCallback(() => setErrorMsg(""), []);

  useEffect(() => {
    let active = true;
    let recoveryEventReceived = false;

    const markReady = (session) => {
      if (!active || !session) return;
      recoveryEventReceived = true;
      setErrorMsg("");
      setVerificationStatus("ready");
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") markReady(session);
    });

    const verifyRecoverySession = async () => {
      const { error: initializationError } = await supabase.auth.initialize();

      if (!active || recoveryEventReceived) return;

      if (initializationError || !recoveryIntent.current) {
        if (import.meta.env.DEV && initializationError) {
          console.error("Password recovery initialization failed", initializationError);
        }
        setErrorMsg(INVALID_LINK_MESSAGE);
        setVerificationStatus("invalid");
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active || recoveryEventReceived) return;

      if (sessionError || !data.session) {
        if (import.meta.env.DEV && sessionError) {
          console.error("Password recovery session missing", sessionError);
        }
        setErrorMsg(INVALID_LINK_MESSAGE);
        setVerificationStatus("invalid");
        return;
      }

      markReady(data.session);
    };

    verifyRecoverySession();

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const updatePassword = async (password) => {
    if (submitting || verificationStatus !== "ready") return false;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (import.meta.env.DEV && signOutError) {
        console.error("Recovery session cleanup failed", signOutError);
      }

      setSuccess(true);
      return true;
    } catch (error) {
      if (import.meta.env.DEV) console.error("Password update failed", error);
      setErrorMsg(
        error?.code === "weak_password"
          ? "That password doesn’t meet the account requirements. Try a longer password."
          : UPDATE_ERROR_MESSAGE
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    verificationStatus,
    submitting,
    errorMsg,
    success,
    updatePassword,
    clearError
  };
}
