import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function FeedingSection({ pet, updatePetField }) {
  return (
    <Box
      sx={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem"
      }}
    >

      {/* Food Brand */}
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
          Food Brand
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.food_brand || ""}
          onSave={(val) => updatePetField("food_brand", val)}
          placeholder="Add food brand"
          renderDisplay={(val) => (
            <Typography
              sx={{
                fontSize: "1.5rem",
                lineHeight: 1.45,
                opacity: val ? 0.85 : 0.55,
                textAlign: "left",
                paddingRight: "1.5rem"
              }}
            >
              {val || "Add food brand"}
            </Typography>
          )}
        />
      </Box>

      {/* Feeding Schedule */}
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
          Feeding Schedule
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.feeding_schedule || ""}
          onSave={(val) => updatePetField("feeding_schedule", val)}
          placeholder="Add feeding schedule"
          renderDisplay={(val) => (
            <Typography
              sx={{
                fontSize: "1.5rem",
                lineHeight: 1.45,
                opacity: val ? 0.85 : 0.55,
                textAlign: "left",
                paddingRight: "1.5rem"
              }}
            >
              {val || "Add feeding schedule"}
            </Typography>
          )}
        />
      </Box>

      {/* Feeding Notes */}
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
          Notes
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.feeding_notes || ""}
          onSave={(val) => updatePetField("feeding_notes", val)}
          placeholder="Add feeding notes"
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
              {val || "Add feeding notes"}
            </Typography>
          )}
        />
      </Box>

    </Box>
  );
}