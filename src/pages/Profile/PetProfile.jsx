import { Box, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { usePet } from "../../hooks/usePet";
import { useUpdatePet } from "../../hooks/useUpdatePet";
import { useUpdateVet } from "../../hooks/useUpdateVet";
import { usePetPhoto } from "../../hooks/usePetPhoto";

import IdentitySection from "../../components/Profile/PetProfile/IdentitySection";
import FeedingSection from "../../components/Profile/PetProfile/FeedingSection";
import BathroomSection from "../../components/Profile/PetProfile/BathroomSection";
import HealthSection from "../../components/Profile/PetProfile/HealthSection";
import BehaviorSection from "../../components/Profile/PetProfile/BehaviorSection";
import HomeSection from "../../components/Profile/PetProfile/HomeSection";
import NotesSection from "../../components/Profile/PetProfile/NotesSection";
import VetInfoCard from "../../components/Profile/PetProfile/VetSection";
import PhotoUploader from "../../components/Profile/PhotoUploader";

export default function PetProfile() {
  const { petId } = useParams();

  const { pet, loading } = usePet(petId);
  const { updatePet } = useUpdatePet();
  const { saveVet } = useUpdateVet();   // ← IMPORTANT
  const { uploadPetPhoto } = usePetPhoto();

  const [localPet, setLocalPet] = useState(null);

  function updateLocalVet(field, value) {
    setLocalPet(prev => ({
      ...prev,
      vet: {
        ...prev.vet,
        [field]: value
      }
    }));
  }

  useEffect(() => {
    if (pet) setLocalPet(pet);
  }, [pet]);

  // 🌸 Photo upload
  async function handlePhotoChange(file) {
    if (!file) return;

    const newUrl = await uploadPetPhoto(petId, file);

    if (newUrl) {
      setLocalPet(prev => ({
        ...prev,
        photo_url: newUrl
      }));
    }
  }

  if (loading || !localPet) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem", color: "#980061" }}>
        Loading pet…
      </Typography>
    );
  }

  // 🌸 Update PET fields
  function updatePetField(field, value) {
    setLocalPet(prev => ({ ...prev, [field]: value }));
    updatePet(petId, { [field]: value });
  }

  // 🌸 Update pet.vet_id when a new vet is created
  function updatePetVetId(newVetId) {
    setLocalPet(prev => ({ ...prev, vet_id: newVetId }));
    updatePet(petId, { vet_id: newVetId });
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "4rem auto", padding: "0 2rem", color: "#980061" }}>
      <Box
        sx={{
          display: "flex",
          gap: "3rem",
          alignItems: "flex-start",
        }}
      >
        <PhotoUploader
          src={localPet.photo_url}
          onChange={handlePhotoChange}
          shape="rounded"
          size={180}
        />

        <Box sx={{ minWidth: "250px" }}>
          <IdentitySection pet={localPet} updatePetField={updatePetField} />
        </Box>

        {/* 🌸 Vet card now uses saveVet + updatePetVetId */}
        <VetInfoCard
          pet={localPet}
          saveVet={saveVet}
          updatePetVetId={updatePetVetId}
          updateLocalVet={updateLocalVet}
        />
      </Box>

      <Divider sx={{ borderColor: "#980061", margin: "2rem 0" }} />

      <Typography sx={{ fontSize: "3rem" }}>Behavior & Personality</Typography>
      <BehaviorSection pet={localPet} updatePetField={updatePetField} />

      <Typography sx={{ fontSize: "3rem" }}>Feeding</Typography>
      <FeedingSection pet={localPet} updatePetField={updatePetField} />

      <Typography sx={{ fontSize: "3rem" }}>Bathroom Habits</Typography>
      <BathroomSection pet={localPet} updatePetField={updatePetField} />

      <Typography sx={{ fontSize: "3rem" }}>Health</Typography>
      <HealthSection pet={localPet} updatePetField={updatePetField} />

      <Typography sx={{ fontSize: "3rem" }}>Home Environment</Typography>
      <HomeSection pet={localPet} updatePetField={updatePetField} />

      <Typography sx={{ fontSize: "3rem" }}>Notes</Typography>
      <NotesSection pet={localPet} updatePetField={updatePetField} />
    </Box>
  );
}