import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function BehaviorSection({ pet }) {
  const empty = isSectionEmpty(pet, [
    "personality",
    "triggers",
    "comfort_items",
  ]);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, marginBottom: "2rem", fontSize: "1.25rem" }}>
        Add behavior & personality notes so sitters understand {pet.name} better.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      {pet.personality && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Personality: {pet.personality}
        </Typography>
      )}

      {pet.triggers && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Triggers: {pet.triggers}
        </Typography>
      )}

      {pet.comfort_items && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Comfort Items: {pet.comfort_items}
        </Typography>
      )}
    </Box>
  );
}