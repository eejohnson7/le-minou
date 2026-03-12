import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import ServiceList from "../components/ServiceList";
import { SERVICES } from "../data/services";

export default function Services() {
  const navigate = useNavigate();

  // FIXED: correct destructuring
  const { user, loading } = useAuthUser();

  // During loading, avoid showing the wrong button
  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem", color: "#980061" }}>
        Loading…
      </Typography>
    );
  }

  const isSignedIn = !!user;

  return (
    <Box sx={{ maxWidth: "700px", margin: "4rem auto", padding: "0 2rem", color: "#980061" }}>
      <Typography sx={{ fontSize: "3rem", marginBottom: "2rem", textAlign: "center" }}>
        Services & Rates
      </Typography>

      <ServiceList services={SERVICES} />

      <Box sx={{ textAlign: "center", marginTop: "3rem" }}>
        {isSignedIn ? (
          <Button
            onClick={() => navigate("/book/pet")}
            variant="plum-contained"
          >
            Book a Service
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/sign-in")}
            variant="plum-outlined"
          >
            Sign in to Book
          </Button>
        )}
      </Box>
    </Box>
  );
}