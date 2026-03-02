import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function FeedingSection({ pet }) {
  const empty = isSectionEmpty(pet, [
    "food_brand",
    "feeding_schedule",
    "feeding_notes",
  ]);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, marginBottom: "2rem", fontSize: "1.25rem" }}>
        Add feeding & water details to complete {pet.name}’s profile.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      {pet.food_brand && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Food: {pet.food_brand}
        </Typography>
      )}

      {pet.feeding_schedule && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Schedule: {pet.feeding_schedule}
        </Typography>
      )}

      {pet.feeding_notes && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, whiteSpace: "pre-wrap" }}>
          {pet.feeding_notes}
        </Typography>
      )}
    </Box>
  );
}