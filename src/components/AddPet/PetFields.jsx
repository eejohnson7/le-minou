import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PetFields({ fields, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...fields, [key]: value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <TextField
        label="Pet Name"
        value={fields.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />

      <TextField
        label="Birthdate"
        type="date"
        value={fields.birthdate}
        onChange={(e) => handleChange("birthdate", e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Species"
        value={fields.species}
        onChange={(e) => handleChange("species", e.target.value)}
        required
      />

      <TextField
        label="Breed"
        value={fields.breed}
        onChange={(e) => handleChange("breed", e.target.value)}
        required
      />
    </Box>
  );
}