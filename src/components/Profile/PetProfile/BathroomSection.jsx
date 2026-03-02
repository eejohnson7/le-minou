import { Box, Typography } from "@mui/material";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function BathroomSection({ pet }) {
  const isCat = pet.species?.toLowerCase() === "cat";
  const isDog = pet.species?.toLowerCase() === "dog";

  const keys = isCat
    ? ["litter_type", "bathroom_notes"]
    : isDog
    ? ["walk_schedule", "bathroom_notes"]
    : ["bathroom_notes"];

  const empty = isSectionEmpty(pet, keys);

  if (empty) {
    return (
      <Typography sx={{ opacity: 0.6, fontSize: "1.25rem" }}>
        Add bathroom routine details to help sitters care for {pet.name}.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      {isCat && pet.litter_type && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Litter: {pet.litter_type}
        </Typography>
      )}

      {isDog && pet.walk_schedule && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Walks: {pet.walk_schedule}
        </Typography>
      )}

      {pet.bathroom_notes && (
        <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, whiteSpace: "pre-wrap" }}>
          {pet.bathroom_notes}
        </Typography>
      )}
    </Box>
  );
}