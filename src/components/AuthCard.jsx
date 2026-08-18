import { Box } from "@mui/material";

export default function AuthCard({ children }) {
  return (
    <Box
      sx={{
        width: "min(calc(100% - 2rem), 420px)",
        maxWidth: 420,
        margin: { xs: "2rem auto", sm: "4rem auto" },
        padding: "2rem",
        borderRadius: "12px",
        background: "#FFDBE9"
      }}
    >
      {children}
    </Box>
  );
}
