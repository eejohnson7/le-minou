import { useState, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import { useResetPassword } from "../../hooks/auth/useResetPassword";

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
        <Typography>
          Verifying your reset link…
        </Typography>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem" }}>
        Reset Password
      </Typography>

      <TextField
        label="New Password"
        type="password"
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="plum-contained"
        fullWidth
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