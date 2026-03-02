import { Box, Typography, TextField } from "@mui/material";

export default function EditNotesSection({ form, setForm }) {
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Notes
      </Typography>

      <TextField label="General Notes" value={form.notes} multiline onChange={(v) => setForm({ ...form, notes: v })} />
    </Box>
  );
}