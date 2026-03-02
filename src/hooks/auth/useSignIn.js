import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const signIn = async (email, password) => {
    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    navigate("/profile");
  };

  return { signIn, loading, errorMsg };
}