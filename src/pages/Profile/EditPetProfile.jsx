import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { usePet } from "../../hooks/usePet";
import { useUpdatePet } from "../../hooks/useUpdatePet";
import PetPhoto from "../../components/Profile/PetProfile/PetPhoto";
import EditIdentitySection from "../../components/Profile/PetProfile/EditPetProfile/EditIdentitySection";
import EditFeedingSection from "../../components/Profile/PetProfile/EditPetProfile/EditFeedingSection";
import EditBathroomSection from "../../components/Profile/PetProfile/EditPetProfile/EditBathroomSection";
import EditHealthSection from "../../components/Profile/PetProfile/EditPetProfile/EditHealthSection";
import EditBehaviorSection from "../../components/Profile/PetProfile/EditPetProfile/EditBehaviorSection";
import EditHomeSection from "../../components/Profile/PetProfile/EditPetProfile/EditHomeSection";
import EditNotesSection from "../../components/Profile/PetProfile/EditPetProfile/EditNotesSection";
import EditVetSection from "../../components/Profile/PetProfile/EditPetProfile/EditVetSection";

export default function EditPetProfile() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { pet, loading } = usePet(petId);
  const { updatePet } = useUpdatePet();

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (pet) setForm(pet);
  }, [pet]);

  if (loading || !form) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem", color: "#980061" }}>
        Loading pet…
      </Typography>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePet(petId, form);
    navigate(`/pet/${petId}`);
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "4rem auto", padding: "0 2rem", color: "#980061" }}>
      <Typography sx={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        Edit {pet.name}
      </Typography>

      <Box sx={{ mb: "2.5rem" }}>
        <PetPhoto pet={pet} editable />
      </Box>

      <form onSubmit={handleSubmit}>
        <EditVetSection form={form} setForm={setForm} />
        <EditIdentitySection form={form} setForm={setForm} />
        <EditFeedingSection form={form} setForm={setForm} />
        <EditBathroomSection form={form} setForm={setForm} />
        <EditHealthSection form={form} setForm={setForm} />
        <EditBehaviorSection form={form} setForm={setForm} />
        <EditHomeSection form={form} setForm={setForm} />
        <EditNotesSection form={form} setForm={setForm} />

        <Button type="submit" variant="plum-contained">
          Save Changes
        </Button>
      </form>
    </Box>
  );
}