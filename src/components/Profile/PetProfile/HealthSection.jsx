import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function HealthSection({ pet }) {
  const empty = isSectionEmpty(pet, [
    "vet_info",
    "medications",
    "health_notes",
  ]);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, marginBottom: "2rem" }}>
        Add health & medical details to support {pet.name}’s care.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      {pet.medications && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Medications: {pet.medications}
        </Typography>
      )}

      {pet.health_notes && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, whiteSpace: "pre-wrap" }}>
          {pet.health_notes}
        </Typography>
      )}
    </Box>
  );
}