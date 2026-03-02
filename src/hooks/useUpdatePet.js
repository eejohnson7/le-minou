// src/hooks/useUpdatePet.js
import { useState } from "react";
import { supabase } from "../utils/supabase";

export function useUpdatePet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updatePet(petId, updates) {
    setLoading(true);
    setError(null);

    const { vet, ...flat } = updates;

    delete flat.id;
    delete flat.photo_url; // signed URL only

    if (flat.weight === "" || flat.weight === null || flat.weight === undefined) {
      flat.weight = null;
    } else {
      flat.weight = Number(flat.weight);
    }

    const sanitized = Object.fromEntries(
      Object.entries(flat).filter(([_, v]) => v !== undefined)
    );

    const allowed = [
      "name",
      "birthdate",
      "species",
      "breed",
      "user_id",
      "vet_id",
      "photo_path",
      "food_brand",
      "feeding_schedule",
      "feeding_notes",
      "litter_type",
      "walk_schedule",
      "bathroom_notes",
      "medications",
      "health_notes",
      "personality",
      "triggers",
      "comfort_items",
      "home_notes",
      "notes",
      "weight"
    ];

    const cleanUpdates = Object.fromEntries(
      Object.entries(sanitized).filter(([key]) => allowed.includes(key))
    );

    const { error: updateError } = await supabase
      .from("pet")
      .update(cleanUpdates)
      .eq("id", petId);

    if (updateError) {
      setError(updateError);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  }

  return { updatePet, loading, error };
}