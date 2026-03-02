import { Box, Typography } from "@mui/material";

export default function ServiceList({ services }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {services.map((s) => (
        <Typography key={s.label} sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
          {s.label} <span style={{ float: "right" }}>{s.price}</span>
        </Typography>
      ))}
    </Box>
  );
}