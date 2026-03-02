import { Box, Typography, TextField } from "@mui/material";

export default function EditFeedingSection({ form, setForm }) {
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Feeding & Water
      </Typography>

      <TextField label="Food Brand / Type" value={form.food_brand} onChange={(v) => setForm({ ...form, food_brand: v })} />
      <TextField label="Feeding Schedule" value={form.feeding_schedule} onChange={(v) => setForm({ ...form, feeding_schedule: v })} />
      <TextField label="Feeding Notes" value={form.feeding_notes} multiline onChange={(v) => setForm({ ...form, feeding_notes: v })} />
    </Box>
  );
}