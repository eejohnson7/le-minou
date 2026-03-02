import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import { useSignUp } from "../../hooks/auth/useSignUp";
import { plumButton } from "../../styles/buttonStyles";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, loading, errorMsg } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2.5rem", color: "#980061", mb: "1.5rem" }}>
        Create Account
      </Typography>

      <TextField
        label="Name"
        fullWidth
        sx={{ mb: "1rem" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        sx={{ mb: "1rem" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mb: "1.5rem" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        sx={plumButton(true)}
        onClick={() => signUp(name, email, password)}
      >
        Create Account
      </Button>

      {errorMsg && (
        <Typography sx={{ color: "red", mt: "1rem" }}>{errorMsg}</Typography>
      )}

      <Typography
        onClick={() => navigate("/sign-in")}
        sx={{
          mt: "1rem",
          textAlign: "center",
          color: "#980061",
          cursor: "pointer"
        }}
      >
        Already have an account? Sign in
      </Typography>
    </AuthCard>
  );
}