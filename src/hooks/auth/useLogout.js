import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      if (import.meta.env.DEV) console.error("Sign out failed", error);
      return false;
    }

    navigate("/", { replace: true });
    return true;
  };

  return logout;
}
