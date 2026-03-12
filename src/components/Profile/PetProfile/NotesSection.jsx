import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function NotesSection({ pet, updatePetField }) {
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
          value={pet.notes || ""}
          onSave={(val) => updatePetField("notes", val)}
          placeholder={`Add general notes about ${pet.name}`}
          multiline
          minRows={3}
          renderDisplay={(val) => (
            <Typography
              sx={{
                fontSize: "1.75rem",
                lineHeight: 1.45,
                opacity: val ? 0.85 : 0.55,
                textAlign: "left",
                whiteSpace: "pre-wrap",
                paddingRight: "1.5rem" // space for pencil
              }}
            >
              {val || `Add general notes about ${pet.name}`}
            </Typography>
          )}
        />
      </Box>
    </Box>
  );
}