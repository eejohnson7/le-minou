import { useCreatePet } from "../../hooks/useCreatePet";
import { Box, Typography, Button, TextField } from "@mui/material";
import VetSelector from "../../components/AddPet/VetSelector";
import PetPhotoUpload from "../../components/AddPet/PetPhotoUpload";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useState } from "react";
import SpeciesSelector from "../../components/SpeciesSelector";
import { useNavigate } from "react-router-dom";
import PetDateField from "../../components/Profile/PetDateField";

export default function AddPet() {
  const { user, loading: loadingUser } = useAuthUser();
  const navigate = useNavigate();

  const [petFields, setPetFields] = useState({
    name: "",
    birthdate: "",
    species: "",
    breed: ""
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [vetData, setVetData] = useState(null);

  const { createPet, loading, error, success } = useCreatePet();

  const updateField = (field, value) => {
    setPetFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await createPet({
      user,
      petFields,
      vetData,
      photoFile
    });
    
    navigate("/profile");
  };

  if (loadingUser || !user) {
    return (
      <Typography sx={{ mt: "4rem", color: "#980061" }}>
        Loading account…
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "4rem auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "2.5rem" }}>
        Add a Pet
      </Typography>

      <TextField
        label="Name"
        value={petFields.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <PetDateField
        label="Birthdate"
        value={petFields.birthdate}
        onChange={(val) => updateField("birthdate", val)}
/>

      <SpeciesSelector
        label="Species"
        value={petFields.species}
        onChange={(v) => updateField("species", v)}
      />

      <TextField
        label="Breed"
        value={petFields.breed}
        onChange={(e) => updateField("breed", e.target.value)}
      />

      <PetPhotoUpload photoFile={photoFile} onChange={setPhotoFile} />

      <VetSelector user={user} onChange={setVetData} />

      <Button variant="plum-contained" onClick={handleSubmit} disabled={loading}>
        Save Pet
      </Button>

      {error && <Typography>{error}</Typography>}
    </Box>
  );
}