import { useCreatePet } from "../../hooks/useCreatePet";
import { Box, Typography, Button } from "@mui/material";
import VetSelector from "../../components/AddPet/VetSelector";
import PetPhotoUpload from "../../components/AddPet/PetPhotoUpload";
import PetFields from "../../components/AddPet/PetFields";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useState } from "react";
import { plumButton } from "../../styles/buttonStyles";

export default function AddPet() {
  const user = useAuthUser();
  const [petFields, setPetFields] = useState({ name: "", birthdate: "", species: "", breed: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [vetData, setVetData] = useState(null);

  const { createPet, loading, error, success } = useCreatePet();

  const handleSubmit = async () => {
    await createPet({
      user,
      petFields,
      vetData,
      photoFile
    });
  };

  return (
    <Box>
      <Typography>Add a Pet</Typography>

      <PetFields fields={petFields} onChange={setPetFields} />

      <PetPhotoUpload photoFile={photoFile} onChange={setPhotoFile} />

      <VetSelector user={user} onChange={setVetData} />

      <Button sx={plumButton(true)} onClick={handleSubmit}>Save Pet</Button>

      {success && <Typography>Pet added successfully.</Typography>}
      {error && <Typography>{error}</Typography>}
    </Box>
  );
}