import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function HomeSection({ pet, updatePetField }) {
  return (
    <Box
      sx={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem"
      }}
    >
      <Box>
        <HoverEditableField
          textAlign="left"
          value={pet.home_notes || ""}
          onSave={(newValue) => updatePetField("home_notes", newValue)}
          placeholder={`Add home environment details to help sitters navigate ${pet.name}’s space.`}
          multiline
          minRows={4}
          renderDisplay={(value) => (
            <Typography
              sx={{
                fontSize: "1.75rem",
                lineHeight: 1.45,
                opacity: value ? 0.85 : 0.55,
                textAlign: "left",
                whiteSpace: "pre-wrap",
                paddingRight: "1.5rem" // important for pencil spacing
              }}
            >
              {value ||
                `Add home environment details to help sitters navigate ${pet.name}’s space.`}
            </Typography>
          )}
        />
      </Box>
    </Box>
  );
}