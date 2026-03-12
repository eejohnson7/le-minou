import { useState } from "react";
import { supabase } from "../utils/supabase";

export function useUpdateVet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🌸 Create a brand new vet
  async function createVet(updates) {
    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("veterinarian")
      .insert(updates)
      .select()
      .single();

    if (insertError) {
      setError(insertError);
      setLoading(false);
      return null;
    }

    setLoading(false);
    return data;
  }

  // 🌸 Update an existing vet
  async function updateVet(vetId, updates) {
    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("veterinarian")
      .update(updates)
      .eq("id", vetId);

    if (updateError) {
      setError(updateError);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  }

  return { createVet, updateVet, loading, error };
}