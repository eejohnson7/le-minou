import { Box, Typography, TextField } from "@mui/material";

export default function EditHealthSection({ form, setForm }) {
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Health & Medical
      </Typography>

      <TextField label="Medications" value={form.medications} onChange={(v) => setForm({ ...form, medications: v })} />
      <TextField label="Health Notes" value={form.health_notes} multiline onChange={(v) => setForm({ ...form, health_notes: v })} />
    </Box>
  );
}