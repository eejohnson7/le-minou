import { useState } from "react";
import { supabase } from "../utils/supabase";
import { usePrivateImage } from "./usePrivateImage";

export function useCreatePet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { uploadFile } = usePrivateImage({
    bucket: "pet-photos",
    filePath: null
  });

  const createPet = async ({ user, petFields, vetData, photoFile }) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!user) throw new Error("You must be logged in.");

      const { name, birthdate, species, breed } = petFields;

      if (!name.trim() || !birthdate || !species.trim() || !breed.trim()) {
        throw new Error("All pet fields are required.");
      }

      let finalVetId = null;

      // Existing vet
      if (vetData.vetId) {
        if (!vetData.vetId) throw new Error("Please select a veterinarian.");
        finalVetId = vetData.vetId;
      }

      // New vet
      if (vetData.newVet) {
        const newVet = vetData.newVet;

        const required = [
          newVet.vet_name,
          newVet.clinic_name,
          newVet.street_line_1,
          newVet.city,
          newVet.state,
          newVet.postal_code,
          newVet.phone
        ];

        if (required.some((f) => !f || !f.trim())) {
          throw new Error("All veterinarian fields are required.");
        }

        const { data: vetInsert, error: vetError } = await supabase
          .from("veterinarian")
          .insert({
            user_id: user.id,
            ...newVet
          })
          .select("id")
          .single();

        if (vetError) throw new Error(vetError.message);

        finalVetId = vetInsert.id;
      }

      // Create pet
      const { data: petInsert, error: petError } = await supabase
        .from("pet")
        .insert({
          ...petFields,
          user_id: user.id,
          vet_id: finalVetId
        })
        .select("id")
        .single();

      if (petError) throw new Error(petError.message);

      const petId = petInsert.id;

      // Upload photo
      if (photoFile) {
        const ext = photoFile.name.split(".").pop();
        const filePath = `${user.id}/${petId}/photo.${ext}`;

        const uploadedPath = await uploadFile(photoFile, filePath);

        const { error: updateError } = await supabase
          .from("pet")
          .update({ photo_path: uploadedPath })
          .eq("id", petId);

        if (updateError) throw new Error(updateError.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createPet, loading, error, success };
}