import { Box } from "@mui/material";

export default function AuthCard({ children }) {
  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "4rem auto",
        padding: "2rem",
        borderRadius: "12px",
        background: "#FFDBE9"
      }}
    >
      {children}
    </Box>
  );
}