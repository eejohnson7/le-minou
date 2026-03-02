import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useUserPets(userId) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      const { data: petsData, error } = await supabase
        .from("pet")
        .select("*")
        .eq("user_id", userId)
        .order("name", { ascending: true });

      if (error) {
        setLoading(false);
        return;
      }

      const withUrls = await Promise.all(
        petsData.map(async (pet) => {
          if (!pet.photo_path) return pet;

          const { data: signed } = await supabase.storage
            .from("pet-photos")
            .createSignedUrl(pet.photo_path, 60 * 60);

          return {
            ...pet,
            photo_url: signed?.signedUrl || null
          };
        })
      );

      setPets(withUrls);
      setLoading(false);
    };

    load();
  }, [userId]);

  return { pets, loading };
}