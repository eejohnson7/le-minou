import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import AuthCard from "../../components/AuthCard";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import { plumButton } from "../../styles/buttonStyles";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { sendReset, loading, message } = useForgotPassword();

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem", mb: 2, color: "#980061" }}>
        Reset Your Password
      </Typography>

      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        sx={plumButton(true)}
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