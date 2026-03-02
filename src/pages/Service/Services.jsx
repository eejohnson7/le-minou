import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import ServiceList from "../../components/ServiceList";
import { SERVICES } from "../../data/services";
import { plumButton } from "../../styles/buttonStyles";

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
      <Typography variant="h2" sx={{ fontSize: "3rem", marginBottom: "2rem", textAlign: "center" }}>
        Services & Rates
      </Typography>

      <ServiceList services={SERVICES} />

      <Box sx={{ textAlign: "center", marginTop: "3rem" }}>
        {isSignedIn ? (
          <Button
            onClick={() => navigate("/book-service")}
            variant="contained"
            sx={plumButton(true)}
          >
            Book a Service
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/sign-in")}
            variant="outlined"
            sx={plumButton(false)}
          >
            Sign in to Book
          </Button>
        )}
      </Box>
    </Box>
  );
}