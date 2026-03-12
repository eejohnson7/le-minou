import { useState } from "react";
import { supabase } from "../utils/supabase";

export function useUpdateVet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🌸 Create a brand new vet
  async function createVet(updates) {
    const { data, error: insertError } = await supabase
      .from("veterinarian")
      .insert(updates)
      .select()
      .single();

    if (insertError) return { error: insertError, data: null };
    return { data, error: null };
  }

  // 🌸 Update an existing vet
  async function updateVet(vetId, updates) {
    const { error: updateError } = await supabase
      .from("veterinarian")
      .update(updates)
      .eq("id", vetId);

    if (updateError) return { success: false, error: updateError };
    return { success: true, error: null };
  }

  // 🌸 Smart wrapper: prevents duplicates
  async function saveVet(vetId, updates) {
    setLoading(true);
    setError(null);

    try {
      if (vetId) {
        // ✔ Update existing vet
        const result = await updateVet(vetId, updates);
        if (result.error) throw result.error;
        return { created: false, vetId };
      }

      // ✔ Create new vet only once
      const result = await createVet(updates);
      if (result.error) throw result.error;

      return { created: true, vetId: result.data.id };
    } catch (err) {
      setError(err);
      return { created: false, vetId: null };
    } finally {
      setLoading(false);
    }
  }

  return { saveVet, createVet, updateVet, loading, error };
}