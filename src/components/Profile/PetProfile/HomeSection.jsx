import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function HomeSection({ pet }) {
  const empty = isSectionEmpty(pet, ["home_notes"]);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, marginBottom: "2rem" }}>
        Add home environment details to help sitters navigate {pet.name}’s space.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, whiteSpace: "pre-wrap" }}>
        {pet.home_notes}
      </Typography>
    </Box>
  );
}