import { useState } from "react";
import { supabase } from "../utils/supabase";
export function usePetPhoto() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function uploadPetPhoto(petId, file) {
    setUploading(true);
    setError(null);

    // Create a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `private/${petId}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("pet-photos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError(uploadError);
      setUploading(false);
      return null;
    }

    // Update the pet row with the new path
    const { error: updateError } = await supabase
      .from("pet")
      .update({ photo_path: filePath })
      .eq("id", petId);

    if (updateError) {
      setError(updateError);
      setUploading(false);
      return null;
    }

    // Generate a signed URL for display
    const { data: signed } = await supabase.storage
      .from("pet-photos")
      .createSignedUrl(filePath, 60 * 60);

    setUploading(false);
    return signed?.signedUrl || null;
  }

  return { uploadPetPhoto, uploading, error };
}