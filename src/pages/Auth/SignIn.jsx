import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import AuthStatus from "../../components/AuthStatus";
import { useSignIn } from "../../hooks/auth/useSignIn";
import { getSafeAuthReturnPath, validateEmail } from "../../utils/auth";

export default function SignIn() {
  const location = useLocation();
  const returnTo = useMemo(() => getSafeAuthReturnPath(location.state?.from), [location.state]);
  const { signIn, loading, errorMsg, clearError } = useSignIn(returnTo);
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      email: validateEmail(values.email),
      password: values.password ? "" : "Enter your password."
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) return;
    await signIn(values.email, values.password);
  };

  return (
    <AuthCard
      eyebrow="Client access"
      title="Welcome back."
      description="Sign in with the email and password connected to your Le Minou client account."
      busy={loading}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} aria-describedby={errorMsg ? "sign-in-error" : undefined}>
        <Box sx={{ display: "grid", gap: 2.25 }}>
          <TextField
            required
            id="sign-in-email"
            name="email"
            label="Email"
            type="email"
            autoComplete="username"
            value={values.email}
            onChange={updateField("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
            disabled={loading}
          />

          <TextField
            required
            id="sign-in-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={updateField("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
            disabled={loading}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.25 }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            sx={{ color: "var(--plum)", fontSize: "0.86rem", fontWeight: 700, textUnderlineOffset: "3px" }}
          >
            Forgot your password?
          </Link>
        </Box>

        {errorMsg && (
          <Box sx={{ mt: 2.25 }}>
            <AuthStatus id="sign-in-error">{errorMsg}</AuthStatus>
          </Box>
        )}

        <Button
          variant="plum-contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mt: 2.5 }}
        >
          {loading ? <CircularProgress size={19} color="inherit" aria-label="Signing in" /> : "Sign in"}
        </Button>
      </Box>

      <Box sx={{ borderTop: "1px solid var(--plum-line-soft)", mt: 3.25, pt: 2.5, textAlign: "center" }}>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.88rem", lineHeight: 1.6 }}>
          Not a client yet?{" "}
          <Link
            component={RouterLink}
            to="/request-care"
            sx={{ color: "var(--plum)", fontWeight: 700, textUnderlineOffset: "3px" }}
          >
            Request care first.
          </Link>
        </Typography>
      </Box>
    </AuthCard>
  );
}
