import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import { useSignUp } from "../../hooks/auth/useSignUp";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, loading, errorMsg } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem" }}>
        Create Account
      </Typography>

      <TextField
        label="Name"
        sx={{ mb: "1rem" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        sx={{ mb: "1rem" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        sx={{ mb: "1.5rem" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="plum-contained"
        fullWidth
        disabled={loading}
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
          cursor: "pointer"
        }}
      >
        Already have an account? Sign in
      </Typography>
    </AuthCard>
  );
}