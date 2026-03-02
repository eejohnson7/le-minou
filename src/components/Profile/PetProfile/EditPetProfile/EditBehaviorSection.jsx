import { Box, Typography, TextField } from "@mui/material";

export default function EditBehaviorSection({ form, setForm }) {
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Behavior & Personality
      </Typography>

      <TextField label="Personality" value={form.personality} onChange={(v) => setForm({ ...form, personality: v })} />
      <TextField label="Triggers" value={form.triggers} onChange={(v) => setForm({ ...form, triggers: v })} />
      <TextField label="Comfort Items" value={form.comfort_items} onChange={(v) => setForm({ ...form, comfort_items: v })} />
    </Box>
  );
}