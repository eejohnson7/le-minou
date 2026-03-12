import { Box, Typography } from "@mui/material";

export default function ServiceOptionCard({
  title,
  description,
  selected = false,
  onSelect
}) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        borderRadius: 3,
        border: "2px solid",
        borderColor: selected ? "#980061" : "#980061",
        backgroundColor: selected ? "#FFDBE9" : "#FFF5F6",
        p: 3,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: selected ? "0 0 0 2px rgba(152,0,97,0.15)" : "none",
        "&:hover": {
          backgroundColor: selected ? "#FFDBE9" : "rgba(152,0,97,0.05)",
          borderColor: "#980061"
        }
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          color: "#980061",
          mb: 1
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: "1.5rem",
          opacity: 0.8,
          lineHeight: 1.4
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}