import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export function useResetPassword() {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Always sign out so Supabase can create a recovery session
    supabase.auth.signOut();

    const params = new URLSearchParams(window.location.search);
    const codeFromQuery = params.get("code");

    // Hash format: #access_token=XYZ&type=recovery
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const codeFromHash = hashParams.get("access_token");

    const code = codeFromQuery || codeFromHash;

    if (!code) {
      setErrorMsg("Your reset link is missing required information. Please request a new one.");
      setLoading(false);
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        if (error.message.includes("expired") || error.message.includes("invalid")) {
          setErrorMsg("This password reset link is invalid or has expired. Please request a new one.");
        } else {
          setErrorMsg("We couldn't verify your reset link. Please try again.");
        }
      }
      setLoading(false);
    });
  }, []);

  const updatePassword = async (password) => {
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      if (error.message.includes("Auth session missing")) {
        setErrorMsg("Your reset session has expired. Please request a new password reset email.");
      } else {
        setErrorMsg("We couldn't update your password. Please try again.");
      }
      return;
    }

    setSuccess(true);
  };

  return { loading, errorMsg, success, updatePassword };
}