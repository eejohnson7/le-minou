import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import { useSignIn } from "../../hooks/auth/useSignIn";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, loading, errorMsg } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard>
      <Typography sx={{ fontSize: "2rem" }}>
        Sign In
      </Typography>

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
        onClick={() => signIn(email, password)}
      >
        Sign In
      </Button>

      {errorMsg && (
        <Typography sx={{ color: "red", mt: "1rem" }}>
          {errorMsg}
        </Typography>
      )}

      <Typography
        onClick={() => navigate("/forgot-password")}
        sx={{
          mt: "1rem",
          textAlign: "center",
          cursor: "pointer"
        }}
      >
        Forgot your password?
      </Typography>

      <Typography
        onClick={() => navigate("/create-account")}
        sx={{
          mt: "0.5rem",
          textAlign: "center",
          cursor: "pointer"
        }}
      >
        Create an account
      </Typography>
    </AuthCard>
  );
}