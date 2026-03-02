import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setLoading(true);

      // Fetch DB row
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        setProfile(null);
        setLoading(false);
        return;
      }

      let signedUrl = null;

      // If a photo_path exists, generate a signed URL
      if (data.photo_path) {
        const { data: signed } = await supabase.storage
          .from("profile-photos")
          .createSignedUrl(data.photo_path, 60 * 60); // 1 hour

        signedUrl = signed?.signedUrl ?? null;
      }

      setProfile({
        ...data,
        signed_photo_url: signedUrl
      });

      setLoading(false);
    };

    load();
  }, [userId]);

  return { profile, loading };
}