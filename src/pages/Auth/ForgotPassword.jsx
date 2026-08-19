import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import AuthStatus from "../../components/AuthStatus";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import { validateEmail } from "../../utils/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { sendReset, loading, errorMsg, sent, clearError } = useForgotPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateEmail(email);
    setEmailError(validationError);
    if (validationError) return;

    await sendReset(email);
  };

  if (sent) {
    return (
      <AuthCard
        eyebrow="Password reset"
        title="Check your email."
        description="If that address is associated with Le Minou client access, password-reset instructions will be sent there."
      >
        <AuthStatus tone="success" title="Your request was received.">
          For privacy, this message is the same whether or not the address matches an account.
        </AuthStatus>
        <Button component={RouterLink} to="/sign-in" variant="plum-contained" fullWidth sx={{ mt: 2.75 }}>
          Back to sign in
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Password reset"
      title="Reset your password."
      description="Enter the email associated with your client access. If the request can be processed, we’ll send reset instructions."
      busy={loading}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} aria-describedby={errorMsg ? "forgot-password-error" : undefined}>
        <TextField
          required
          id="forgot-password-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError("");
            clearError();
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          disabled={loading}
        />

        {errorMsg && (
          <Box sx={{ mt: 2.25 }}>
            <AuthStatus id="forgot-password-error">{errorMsg}</AuthStatus>
          </Box>
        )}

        <Button variant="plum-contained" type="submit" fullWidth disabled={loading} sx={{ mt: 2.5 }}>
          {loading ? <CircularProgress size={19} color="inherit" aria-label="Sending reset instructions" /> : "Send reset instructions"}
        </Button>
      </Box>

      <Box sx={{ mt: 2.5, textAlign: "center" }}>
        <Link
          component={RouterLink}
          to="/sign-in"
          sx={{ color: "var(--plum)", fontSize: "0.88rem", fontWeight: 700, textUnderlineOffset: "3px" }}
        >
          Back to sign in
        </Link>
      </Box>
    </AuthCard>
  );
}
