import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { SectionEyebrow } from "../components/layout/SectionHeading";

export default function NotFound() {
  return (
    <Box
      component="section"
      aria-labelledby="not-found-title"
      sx={{ bgcolor: "var(--paper)", minHeight: "60vh", py: { xs: 8, sm: 11, md: 14 } }}
    >
      <PageContainer narrow>
        <SectionEyebrow sx={{ mb: 1.5 }}>404 · Page not found</SectionEyebrow>
        <Typography
          id="not-found-title"
          component="h1"
          variant="h1"
          sx={{ color: "var(--ink)", fontSize: { xs: "3.1rem", sm: "4.2rem", md: "5rem" }, lineHeight: 0.98, maxWidth: 720 }}
        >
          This page wandered off its usual route.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8, mt: 3, maxWidth: 620 }}>
          The address may have changed, but thoughtful care is still close by.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, borderTop: "1px solid var(--plum-line)", mt: 5, pt: 3 }}>
          <Button component={RouterLink} to="/" variant="plum-contained">
            Go home
          </Button>
          <Button component={RouterLink} to="/request-care" variant="plum-outlined">
            Request care
          </Button>
        </Box>
      </PageContainer>
    </Box>
  );
}
