import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import AuthStatus from "../../components/AuthStatus";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { MIN_PASSWORD_LENGTH } from "../../utils/auth";

export default function ResetPassword() {
  const {
    verificationStatus,
    submitting,
    updatePassword,
    errorMsg,
    success,
    clearError
  } = useResetPassword();
  const [values, setValues] = useState({ password: "", confirmation: "" });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      password: !values.password
        ? "Enter a new password."
        : values.password.length < MIN_PASSWORD_LENGTH
          ? `Use at least ${MIN_PASSWORD_LENGTH} characters.`
          : "",
      confirmation: !values.confirmation
        ? "Confirm your new password."
        : values.password !== values.confirmation
          ? "The passwords don’t match."
          : ""
    };
    setErrors(nextErrors);

    if (nextErrors.password || nextErrors.confirmation) return;
    await updatePassword(values.password);
  };

  if (verificationStatus === "verifying") {
    return (
      <AuthCard
        eyebrow="Password reset"
        title="Checking your reset link."
        description="This should only take a moment."
        busy
      >
        <Box role="status" aria-live="polite" sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "var(--muted-ink)" }}>
          <CircularProgress size={20} color="inherit" />
          Verifying secure access…
        </Box>
      </AuthCard>
    );
  }

  if (verificationStatus === "invalid") {
    return (
      <AuthCard
        eyebrow="Password reset"
        title="This reset link is no longer valid."
        description="Reset links can expire or stop working after they have been used."
      >
        <AuthStatus>{errorMsg}</AuthStatus>
        <Button component={RouterLink} to="/forgot-password" variant="plum-contained" fullWidth sx={{ mt: 2.75 }}>
          Request a new link
        </Button>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard
        eyebrow="Password reset"
        title="Your password is updated."
        description="You can now sign in with your new password."
      >
        <AuthStatus tone="success" title="All set.">
          Your temporary recovery session has been closed.
        </AuthStatus>
        <Button component={RouterLink} to="/sign-in" variant="plum-contained" fullWidth sx={{ mt: 2.75 }}>
          Sign in
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Password reset"
      title="Choose a new password."
      description={`Use at least ${MIN_PASSWORD_LENGTH} characters. A longer, unique password is best.`}
      busy={submitting}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} aria-describedby={errorMsg ? "reset-password-error" : undefined}>
        <Box sx={{ display: "grid", gap: 2.25 }}>
          <TextField
            required
            id="new-password"
            name="new-password"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={updateField("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
            disabled={submitting}
            slotProps={{ htmlInput: { minLength: MIN_PASSWORD_LENGTH } }}
          />
          <TextField
            required
            id="confirm-new-password"
            name="confirm-new-password"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={values.confirmation}
            onChange={updateField("confirmation")}
            error={Boolean(errors.confirmation)}
            helperText={errors.confirmation}
            disabled={submitting}
            slotProps={{ htmlInput: { minLength: MIN_PASSWORD_LENGTH } }}
          />
        </Box>

        {errorMsg && (
          <Box sx={{ mt: 2.25 }}>
            <AuthStatus id="reset-password-error">{errorMsg}</AuthStatus>
          </Box>
        )}

        <Button variant="plum-contained" type="submit" fullWidth disabled={submitting} sx={{ mt: 2.5 }}>
          {submitting ? <CircularProgress size={19} color="inherit" aria-label="Updating password" /> : "Update password"}
        </Button>
      </Box>
    </AuthCard>
  );
}
