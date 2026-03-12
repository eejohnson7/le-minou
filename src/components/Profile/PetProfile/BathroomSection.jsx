import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function BathroomSection({ pet, updatePetField }) {
  const isCat = pet.species?.toLowerCase() === "cat";
  const isDog = pet.species?.toLowerCase() === "dog";

  return (
    <Box
      sx={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem"
      }}
    >

      {/* Cat: Litter Type */}
      {isCat && (
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
            Litter Type
          </Typography>

          <HoverEditableField
            textAlign="left"
            value={pet.litter_type || ""}
            onSave={(val) => updatePetField("litter_type", val)}
            placeholder="Add litter type"
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
                {val || "Add litter type"}
              </Typography>
            )}
          />
        </Box>
      )}

      {/* Dog: Walk Schedule */}
      {isDog && (
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
            Walk Schedule
          </Typography>

          <HoverEditableField
            textAlign="left"
            value={pet.walk_schedule || ""}
            onSave={(val) => updatePetField("walk_schedule", val)}
            placeholder="Add walk schedule"
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
                {val || "Add walk schedule"}
              </Typography>
            )}
          />
        </Box>
      )}

      {/* Bathroom Notes (all species) */}
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
          Bathroom Notes
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.bathroom_notes || ""}
          onSave={(val) => updatePetField("bathroom_notes", val)}
          placeholder="Add bathroom notes"
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
              {val || "Add bathroom notes"}
            </Typography>
          )}
        />
      </Box>

    </Box>
  );
}