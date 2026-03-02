import { Typography, TextField, Box } from "@mui/material";

export default function EditVetSection({ form, setForm }) {
  const update = (field, value) =>
    setForm((prev) => ({
      ...prev,
      vet: {
        ...prev.vet,
        [field]: value
      }
    }));

  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Veterinarian
      </Typography>

      <TextField
        label="Veterinarian Name"
        value={form.vet?.vet_name || ""}
        onChange={(v) => update("vet_name", v)}
      />

      <TextField
        label="Clinic Name"
        value={form.vet?.clinic_name || ""}
        onChange={(v) => update("clinic_name", v)}
      />

      <TextField
        label="Phone"
        value={form.vet?.phone || ""}
        onChange={(v) => update("phone", v)}
      />

      <TextField
        label="Street Address"
        value={form.vet?.street_line_1 || ""}
        onChange={(v) => update("street_line_1", v)}
      />
    </Box>
  );
}