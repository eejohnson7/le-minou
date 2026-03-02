import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import AuthCard from "../../components/AuthCard";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { sendReset, loading, message } = useForgotPassword();

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem" }}>
        Reset Your Password
      </Typography>

      <TextField
        label="Email"
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="plum-contained"
        fullWidth
        disabled={loading}
        onClick={() => sendReset(email)}
      >
        Send Reset Email
      </Button>

      {message && (
        <Typography sx={{ mt: 2 }}>{message}</Typography>
      )}
    </AuthCard>
  );
}