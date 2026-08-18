import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import CtaLink from "../layout/CtaLink";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function AboutClosingCta() {
  return (
    <Section
      aria-labelledby="about-closing-title"
      sx={{
        bgcolor: "var(--paper)",
        background: { md: "linear-gradient(90deg, var(--blush) 0 30%, var(--paper) 30% 100%)" },
        borderTop: "1px solid var(--plum-line-soft)",
        py: { xs: 8, sm: 10, md: 12 }
      }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(190px, 0.46fr) minmax(0, 1.54fr)" },
        gap: { xs: 3, md: 8, lg: 11 },
        alignItems: "start"
      }}
    >
      <SectionEyebrow sx={{ pt: { md: 1 } }}>The next conversation</SectionEyebrow>
      <Box>
        <Typography
          id="about-closing-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.65rem", sm: "3.6rem", md: "4.15rem" }, lineHeight: 1, maxWidth: 800 }}
        >
          Every good care plan starts with an introduction.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.8, maxWidth: 650, mt: 2.5 }}>
          Share who your pets are, what their days look like, and what would help you feel comfortable while you are away.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: { xs: 2, sm: 2.5 }, mt: 3.5 }}>
          <CtaLink to="/request-care">Request care</CtaLink>
          <Link
            component={RouterLink}
            to="/services"
            underline="none"
            sx={{
              color: "var(--plum)",
              fontSize: "0.93rem",
              fontWeight: 700,
              borderBottom: "1px solid var(--plum-line)",
              pb: 0.35,
              "&:hover": { borderColor: "var(--plum)" }
            }}
          >
            View services &amp; pricing
          </Link>
        </Box>
      </Box>
    </Section>
  );
}
