import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function BrandStatement() {
  return (
    <Section
      aria-labelledby="brand-statement-title"
      sx={{ bgcolor: "var(--paper)", borderBlock: "1px solid var(--plum-line-soft)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(180px, 0.45fr) minmax(0, 1.55fr)" },
        gap: { xs: 3, md: 7 }
      }}
    >
      <Box>
        <SectionEyebrow sx={{ mb: 2 }}>02 · The promise</SectionEyebrow>
        <Typography className="handwritten-accent" sx={{ color: "var(--plum)", fontSize: "1.1rem", transform: "rotate(-2deg)", transformOrigin: "left" }}>
          one familiar person
        </Typography>
      </Box>

      <Box sx={{ borderLeft: { md: "1px solid var(--plum-line)" }, pl: { md: 6 } }}>
        <Typography
          id="brand-statement-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.55rem" }, lineHeight: 1.08, maxWidth: 850 }}
        >
          You are trusting someone with two things that matter: your pets and your home.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.8, maxWidth: 710, mt: 3 }}>
          Le Minou keeps that trust practical. Care follows the routines your pets already know, home details are remembered, and updates arrive clearly—without a rotating cast of caregivers or unnecessary guesswork.
        </Typography>
      </Box>
    </Section>
  );
}

