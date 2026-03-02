import { Typography, TextField, Box } from "@mui/material";
import SpeciesSelector from "../../../SpeciesSelector";

export default function EditIdentitySection({ form, setForm }) {
  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Identity
      </Typography>

      <TextField
        label="Name"
        value={form.name}
        onChange={(v) => update("name", v)}
      />

      <TextField
        label="Breed"
        value={form.breed}
        onChange={(v) => update("breed", v)}
      />

      <SpeciesSelector
        value={form.species}
        onChange={(v) => update("species", v)}
      />
    </Box>
  );
}