import { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { plumButton } from "../../styles/buttonStyles";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { loading, updatePassword, errorMsg, success } = useResetPassword();

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/sign-in"), 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (loading) {
    return (
      <AuthCard>
        <Typography sx={{ color: "#980061" }}>
          Verifying your reset link…
        </Typography>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem", mb: 2, color: "#980061" }}>
        Reset Password
      </Typography>

      <TextField
        label="New Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={plumButton(true)}
        onClick={() => updatePassword(password)}
      >
        Update Password
      </Button>

      {errorMsg && (
        <Typography sx={{ color: "red", mt: 2 }}>{errorMsg}</Typography>
      )}

      <Typography
        onClick={() => navigate("/forgot-password")}
        sx={{
          mt: "1rem",
          textAlign: "center",
          color: "#980061",
          cursor: "pointer"
        }}
      >
        Request a new link
      </Typography>

      {success && (
        <Typography sx={{ color: "green", mt: 2 }}>
          Password updated! Redirecting…
        </Typography>
      )}
    </AuthCard>
  );
}