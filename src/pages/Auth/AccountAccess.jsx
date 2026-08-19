import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import AuthStatus from "../../components/AuthStatus";

export default function AccountAccess() {
  return (
    <AuthCard
      eyebrow="Client access"
      title="Client accounts begin after care is confirmed."
      description="Le Minou isn’t offering public account creation right now. New clients can start with a care request—no account is needed."
    >
      <AuthStatus tone="neutral" title="Already have client access?">
        Use the sign-in page with the account details connected to your client profile.
      </AuthStatus>

      <Box sx={{ display: "grid", gap: 1.25, mt: 2.75 }}>
        <Button component={RouterLink} to="/request-care" variant="plum-contained" fullWidth>
          Request care
        </Button>
        <Button component={RouterLink} to="/sign-in" variant="plum-outlined" fullWidth>
          Sign in
        </Button>
      </Box>
    </AuthCard>
  );
}
