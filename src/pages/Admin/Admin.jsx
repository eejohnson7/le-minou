import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import ShellHeader from "../../layouts/ShellHeader";
import PageContainer from "../../components/layout/PageContainer";
import AdminLogin from "../../components/admin/AdminLogin";
import RequestList from "../../components/admin/RequestList";
import { useAdminAccess } from "../../components/admin/useAdminAccess";
import { supabase } from "../../utils/supabase";

export default function Admin() {
  const access = useAdminAccess();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    if (signingOut) return;
    setSigningOut(true); setError("");
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch { setError("Couldn’t sign out. Please try again."); }
    finally { setSigningOut(false); }
  }
  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <ShellHeader
        ariaLabel="Admin navigation"
        links={[{ label: "Back to site", to: "/" }]}
        actions={access.userId && (
          <Button variant="plum-outlined" onClick={logout} disabled={signingOut}>
            {signingOut ? "Logging out…" : "Log out"}
          </Button>
        )}
      />
      <PageContainer component="main" sx={{ py: { xs: 4, sm: 6 }, maxWidth: 960 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {access.state === "loading" && <Box role="status"><CircularProgress size={24} sx={{ mr: 2 }} />Checking access…</Box>}
        {access.state === "signed-out" && <AdminLogin />}
        {access.state === "allowed" && !signingOut && <RequestList key={access.userId} />}
        {access.state === "denied" && <Typography role="status">This account doesn’t have admin access.</Typography>}
        {access.state === "error" && <Alert severity="error" action={<Button onClick={access.retry}>Try again</Button>}>Couldn’t check admin access.</Alert>}
        {access.state === "unconfigured" && <Alert severity="error">Admin login isn’t configured yet.</Alert>}
      </PageContainer>
    </Box>
  );
}
