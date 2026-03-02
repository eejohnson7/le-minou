import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function useVets(userId) {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadVets = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("veterinarian")
        .select("*")
        .eq("user_id", userId)
        .order("vet_name");

      if (error) {
        setError(error);
      } else {
        setVets(data);
      }

      setLoading(false);
    };

    loadVets();
  }, [userId]);

  return { vets, loading, error };
}