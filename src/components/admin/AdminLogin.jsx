import { useRef, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { supabase } from "../../utils/supabase";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  async function signIn(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(event.currentTarget);
    inFlight.current = true;
    setBusy(true); setError(""); setSent(false);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: form.get("email").trim(),
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });
      if (error) throw error;
      setSent(true);
    } catch { setError("Couldn’t send the link. Check your email and try again."); }
    finally { inFlight.current = false; setBusy(false); }
  }
  return (
    <Box sx={{ maxWidth: 420, mx: "auto" }}>
      <Typography component="h1" variant="h3" sx={{ mb: 3 }}>Admin login</Typography>
      <Box component="form" onSubmit={signIn} sx={{ display: "grid", gap: 2 }} aria-busy={busy}>
        <TextField name="email" label="Email" type="email" autoComplete="email" onChange={() => { setSent(false); setError(""); }} required />
        {sent && <Alert severity="success">Check your email for a sign-in link.</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="plum-contained" disabled={busy}>{busy ? "Sending…" : "Send sign-in link"}</Button>
      </Box>
    </Box>
  );
}
