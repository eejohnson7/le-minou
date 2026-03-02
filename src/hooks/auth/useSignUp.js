// hooks/useSignUp.js
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const signUp = async (name, email, password) => {
    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ") || null;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    const { error: profileError } = await supabase.from("user").insert({
      id: user.id,
      first_name: firstName || null,
      last_name: lastName,
      email
    });

    if (profileError) {
      setErrorMsg(profileError.message);
      setLoading(false);
      return;
    }

    navigate("/profile");
  };

  return { signUp, loading, errorMsg };
}