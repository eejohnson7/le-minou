import { useState } from "react";
import { supabase } from "../../utils/supabase";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendReset = async (email) => {
    if (loading) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password"
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password reset email sent!");
    setLoading(false);
  };

  return { sendReset, loading, message };
}