import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";
import { isSectionEmpty } from "../../../utils/isSectionEmpty";

export default function BehaviorSection({ pet, updatePetField }) {
  const empty = isSectionEmpty(pet, [
    "personality",
    "triggers",
    "comfort_items",
  ]);

  //
  // EMPTY STATE — soft, inviting, editorial
  //
  if (empty) {
    return (
      <HoverEditableField
        textAlign="left"
        value=""
        placeholder={`Add behavior & personality notes so sitters understand ${pet.name} better.`}
        onSave={(val) => updatePetField("personality", val)}
        renderDisplay={() => (
          <Typography
            sx={{
              opacity: 0.6,
              marginBottom: "2rem",
              fontSize: "1.25rem",
              lineHeight: 1.45,
              textAlign: "left"
            }}
          >
            Add behavior & personality notes so sitters understand {pet.name} better.
          </Typography>
        )}
        multiline
        minRows={3}
      />
    );
  }

  //
  // FILLED STATE — boutique, editorial, calm
  //
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>

      {/* Personality */}
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
          Personality
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.personality || ""}
          onSave={(val) => updatePetField("personality", val)}
          placeholder="Add personality notes"
          multiline
          minRows={2}
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
              {val || "Add personality notes"}
            </Typography>
          )}
        />
      </Box>

      {/* Triggers */}
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
          Triggers
        </Typography>

        <HoverEditableField
          textAlign="left"
          value={pet.triggers || ""}
          onSave={(val) => updatePetField("triggers", val)}
          placeholder="Add triggers"
          multiline
          minRows={2}
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
              {val || "Add triggers"}
            </Typography>
          )}
        />
      </Box>
    </Box>
  );
}