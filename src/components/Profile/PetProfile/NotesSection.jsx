import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function NotesSection({ pet }) {
  const empty = isSectionEmpty(pet, ["notes"]);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, marginBottom: "2rem" }}>
        Add general notes about {pet.name} to complete their profile.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, whiteSpace: "pre-wrap" }}>
        {pet.notes}
      </Typography>
    </Box>
  );
}