import { Box, Typography, TextField } from "@mui/material";

export default function EditHomeSection({ form, setForm }) {
  return (
    <Box sx={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography sx={{ fontSize: "1.75rem" }}>
        Home Environment
      </Typography>

      <TextField label="Home Notes" value={form.home_notes} multiline onChange={(v) => setForm({ ...form, home_notes: v })} />
    </Box>
  );
}