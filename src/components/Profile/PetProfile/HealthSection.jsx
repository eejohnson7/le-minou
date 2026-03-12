import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function HealthSection({ pet, updatePetField }) {
  return (
    <Box
      sx={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem"
      }}
    >

      {/* Medications */}
      <Box>
        <Typography
          sx={{
            fontSize: "2.25rem",
            opacity: 0.7,
            textAlign: "left",
            marginBottom: "0.35rem",
            letterSpacing: "0.3px"
          }}
        >
          Medications
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.medications || ""}
          onSave={(val) => updatePetField("medications", val)}
          placeholder="Add medications"
          multiline
          minRows={2}
          renderDisplay={(val) => (
            <Typography
              sx={{
                fontSize: "1.5rem",
                lineHeight: 1.45,
                opacity: val ? 0.85 : 0.55,
                textAlign: "left",
                whiteSpace: "pre-wrap",
                paddingRight: "1.5rem"
              }}
            >
              {val || "Add medications"}
            </Typography>
          )}
        />
      </Box>

      {/* Health Notes */}
      <Box>
        <Typography
          sx={{
            fontSize: "2.25rem",
            opacity: 0.7,
            textAlign: "left",
            marginBottom: "0.35rem",
            letterSpacing: "0.3px"
          }}
        >
          Health Notes
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.health_notes || ""}
          onSave={(val) => updatePetField("health_notes", val)}
          placeholder="Add health notes"
          multiline
          minRows={2}
          renderDisplay={(val) => (
            <Typography
              sx={{
                fontSize: "1.5rem",
                lineHeight: 1.45,
                opacity: val ? 0.85 : 0.55,
                textAlign: "left",
                whiteSpace: "pre-wrap",
                paddingRight: "1.5rem"
              }}
            >
              {val || "Add health notes"}
            </Typography>
          )}
        />
      </Box>

    </Box>
  );
}