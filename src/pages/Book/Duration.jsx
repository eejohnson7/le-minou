import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBooking } from "../../context/BookingContext";

export default function Duration() {
  const navigate = useNavigate();

  const { service, duration, setDuration } = useBooking();

  // Safe redirect if no service selected
  useEffect(() => {
    if (!service) {
      navigate("/book/service");
    }
  }, [service, navigate]);

  if (!service) return null;

  const handleSelect = (minutes) => {
    setDuration(minutes);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 4 }}>
      <Typography sx={{ mb: 3, fontSize: "3rem" }}>
        How long should the visit be?
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[30, 60].map((minutes) => (
          <Box
            key={minutes}
            onClick={() => handleSelect(minutes)}
            sx={{
              borderRadius: 3,
              border: "2px solid",
              borderColor: duration === minutes ? "#980061" : "#980061",
              backgroundColor: duration === minutes ? "#FFDBE9" : "#FFF5F6",
              p: 3,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  duration === minutes ? "#FFDBE9" : "rgba(152,0,97,0.05)",
                borderColor: "#980061"
              }
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                color: "#980061"
              }}
            >
              {minutes} Minutes
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        variant={duration ? "plum-contained" : "plum-outlined"}
        disabled={!duration}
        onClick={() => navigate("/book/date")}
        sx={{ mt: 4, width: "100%", borderRadius: 2, py: 1.5, fontSize: "1.75rem" }}
      >
        Continue
      </Button>
    </Box>
  );
}