import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { SectionEyebrow } from "../components/layout/SectionHeading";

export default function PrivateAccess() {
  return (
    <Box
      component="section"
      aria-labelledby="private-access-title"
      sx={{ bgcolor: "var(--cream)", minHeight: "calc(100dvh - 68px)", py: { xs: 8, sm: 11, md: 14 } }}
    >
      <PageContainer narrow>
        <Box sx={{ maxWidth: 720 }}>
          <SectionEyebrow sx={{ mb: 1.5 }}>Private client access</SectionEyebrow>
          <Typography
            id="private-access-title"
            component="h1"
            variant="h1"
            sx={{ color: "var(--ink)", fontSize: { xs: "3rem", sm: "4rem", md: "4.7rem" }, lineHeight: 0.98 }}
          >
            Client tools are still being prepared.
          </Typography>
          <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.8, mt: 3, maxWidth: 650 }}>
            Le Minou&apos;s account, pet profile, photo library, and booking tools are not part of this public launch. Care requests are open now, and no account is needed to get started.
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, borderTop: "1px solid var(--plum-line)", mt: 5, pt: 3 }}>
            <Button component={RouterLink} to="/request-care" variant="plum-contained">
              Request care
            </Button>
            <Button component={RouterLink} to="/" variant="plum-outlined">
              Return home
            </Button>
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
}
