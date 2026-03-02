import { Box, Typography, TextField } from "@mui/material";

export default function EditBathroomSection({ form, setForm }) {
  const isCat = form.species?.toLowerCase() === "cat";
  const isDog = form.species?.toLowerCase() === "dog";

  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Bathroom Routine
      </Typography>

      {isCat && (
        <TextField label="Litter Type" value={form.litter_type} onChange={(v) => setForm({ ...form, litter_type: v })} />
      )}

      {isDog && (
        <TextField label="Walk Schedule" value={form.walk_schedule} onChange={(v) => setForm({ ...form, walk_schedule: v })} />
      )}

      <TextField label="Bathroom Notes" value={form.bathroom_notes} multiline onChange={(v) => setForm({ ...form, bathroom_notes: v })} />
    </Box>
  );
}