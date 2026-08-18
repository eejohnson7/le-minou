import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function OriginSection() {
  return (
    <Section
      aria-labelledby="about-origin-title"
      sx={{ bgcolor: "var(--paper)", py: { xs: 8, sm: 11, md: 15 } }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.92fr) minmax(340px, 1.08fr)" },
        gap: { xs: 4.5, md: 10, lg: 14 },
        alignItems: "start"
      }}
    >
      <Box>
        <SectionEyebrow sx={{ mb: 1.5 }}>How Le Minou began</SectionEyebrow>
        <Typography
          id="about-origin-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.55rem", sm: "3.25rem", md: "4rem" }, lineHeight: 1.02, maxWidth: 540 }}
        >
          Dependability became a pattern.
        </Typography>
      </Box>

      <Box sx={{ borderTop: "1px solid var(--plum-line)", pt: { xs: 3, md: 4 } }}>
        <Typography sx={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: { xs: "1.45rem", sm: "1.75rem" }, fontWeight: 700, lineHeight: 1.35 }}>
          Le Minou grew from a practical role Erin already held: being the person friends and neighbors trusted when their pets needed care.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.07rem" }, lineHeight: 1.85, mt: 3 }}>
          It meant learning the feeding routine, remembering the home details, noticing what helped an animal settle, and treating someone else&apos;s space with care. There was no grand founder moment—just the same kind of thoughtful help, requested again and again.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.07rem" }, lineHeight: 1.85, mt: 2 }}>
          Over time, that pattern became a clear idea for a local service: one familiar person, close attention, and care that respects the life already happening at home.
        </Typography>
      </Box>
    </Section>
  );
}
