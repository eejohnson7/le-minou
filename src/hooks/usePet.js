import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function usePet(petId) {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!petId) return;

    async function fetchPet() {
      setLoading(true);
      setError(null);

      // Fetch pet
      const { data: petData, error: petError } = await supabase
        .from("pet")
        .select("*")
        .eq("id", petId)
        .single();

      if (petError) {
        setError(petError);
        setLoading(false);
        return;
      }

      // Fetch veterinarian using the same table VetSelector uses
      let vet = null;
      if (petData.vet_id) {
        const { data: vetData } = await supabase
          .from("veterinarian")
          .select("*")
          .eq("id", petData.vet_id)
          .single();

        vet = vetData || null;
      }

      // Signed URL
      let signedUrl = null;
      if (petData.photo_path) {
        const { data: urlData } = await supabase.storage
          .from("pet-photos")
          .createSignedUrl(petData.photo_path, 60 * 60);

        signedUrl = urlData?.signedUrl || null;
      }

      setPet({
        ...petData,
        photo_url: signedUrl,
        vet, // ← full veterinarian object
      });

      setLoading(false);
    }

    fetchPet();
  }, [petId]);

  return { pet, loading, error };
}