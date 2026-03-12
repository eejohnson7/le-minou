import { Box, Typography } from "@mui/material";
import { calculateAge } from "../../../utils/calculateAge";
import HoverEditableField from "../HoverEditableField";

export default function IdentitySection({ pet, updatePetField }) {
  return (
    <Box sx={{ marginBottom: "2rem" }}>
      {/* NAME */}
      <HoverEditableField
        value={pet.name}
        onSave={(val) => updatePetField("name", val)}
        placeholder="Add name"
        renderDisplay={(val) => {
          if (!val) {
            return (
              <Typography
                sx={{
                  fontSize: "4rem",
                  marginBottom: "0.5rem",
                  opacity: 0.4,
                }}
              >
                Add name
              </Typography>
            );
          }

          return (
            <Typography sx={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
              {val}
            </Typography>
          );
        }}
      />

      {/* SPECIES */}
      <HoverEditableField
        fields={[
          {
            label: "Species",
            value: pet.species,
            onSave: (v) => updatePetField("species", v),
            width: "120px",
          },
          {
            label: "Breed",
            value: pet.breed,
            onSave: (v) => updatePetField("breed", v),
            width: "160px",
          },
        ]}
        renderDisplay={([species, breed]) => {
          if (!species && !breed) {
            return (
              <Typography sx={{ fontSize: "1.5rem", opacity: 0.4 }}>
                Add species & breed
              </Typography>
            );
          }

          return (
            <Typography sx={{ fontSize: "1.5rem", opacity: 0.8 }}>
              {species}
              {breed ? ` – ${breed}` : ""}
            </Typography>
          );
        }}
      />

      {/* BIRTHDATE */}
      <HoverEditableField
        value={pet.birthdate}
        type="date"
        onSave={(val) => updatePetField("birthdate", val)}
        placeholder="Add birthdate"
        renderDisplay={(val) => {
          if (!val) {
            return (
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  opacity: 0.4,
                  mt: "0.25rem",
                }}
              >
                Add birthdate
              </Typography>
            );
          }

          return (
            <Typography
              sx={{ fontSize: "1.5rem", opacity: 0.8, mt: "0.25rem" }}
            >
              Age: {calculateAge(val)}
            </Typography>
          );
        }}
      />

      {/* WEIGHT */}
      <HoverEditableField
        value={pet.weight}
        onSave={(val) => updatePetField("weight", val)}
        placeholder="Add weight"
        renderDisplay={(val) => {
          if (!val) {
            return (
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  opacity: 0.4,
                  mt: "0.25rem",
                }}
              >
                Add weight
              </Typography>
            );
          }

          return (
            <Typography
              sx={{ fontSize: "1.5rem", opacity: 0.8, mt: "0.25rem" }}
            >
              Weight: {val} lbs
            </Typography>
          );
        }}
      />
    </Box>
  );
}