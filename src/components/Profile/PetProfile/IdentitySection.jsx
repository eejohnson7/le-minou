import { Box, Typography } from "@mui/material";
import { calculateAge } from "../../../utils/calculateAge";

export default function IdentitySection({ pet }) {
  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Typography sx={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
        {pet.name}
      </Typography>

      <Typography sx={{ fontSize: "1.5rem", opacity: 0.8 }}>
        {pet.species} {pet.breed ? `- ${pet.breed}` : ""}
      </Typography>

      {pet.birthdate && (
        <Typography sx={{ fontSize: "1.5rem", opacity: 0.8, marginTop: "0.25rem" }}>
          Age: {calculateAge(pet.birthdate)}
        </Typography>
      )}

      {pet.weight && (
        <Typography sx={{ fontSize: "1.5rem", opacity: 0.8, marginTop: "0.25rem" }}>
          Weight: {pet.weight} lbs
        </Typography>
      )}
    </Box>
  );
}