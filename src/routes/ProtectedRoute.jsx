import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthUser();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        role="status"
        aria-live="polite"
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          color: "var(--muted-ink)",
          bgcolor: "var(--cream)"
        }}
      >
        <CircularProgress size={20} color="inherit" />
        <Typography sx={{ fontSize: "0.9rem" }}>Checking client access…</Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}
