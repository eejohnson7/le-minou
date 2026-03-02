import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in");
  };

  return logout;
}