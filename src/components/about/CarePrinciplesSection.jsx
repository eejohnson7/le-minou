import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

const principles = [
  {
    title: "Familiarity",
    description: "The same person learns the pets, the home, and the details that make each visit feel recognizable."
  },
  {
    title: "Routine",
    description: "Feeding, walks, litter, medication notes, comfort habits, and home instructions are treated as connected parts of care."
  },
  {
    title: "Communication",
    description: "Updates stay clear and useful, so clients know how their pets are doing while they are away."
  },
  {
    title: "Calm attention",
    description: "Care follows the animal in front of Erin, with a steady presence instead of a rushed, one-size-fits-all interaction."
  }
];

export default function CarePrinciplesSection() {
  return (
    <Section
      aria-labelledby="care-principles-title"
      sx={{ bgcolor: "var(--cream)", py: { xs: 8, sm: 10, md: 13 } }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.25fr) minmax(290px, 0.75fr)" },
          gap: { xs: 2.5, md: 9 },
          alignItems: "end",
          mb: { xs: 5, md: 7 }
        }}
      >
        <Box>
          <SectionEyebrow sx={{ mb: 1.5 }}>Care, in practice</SectionEyebrow>
          <Typography
            id="care-principles-title"
            component="h2"
            variant="h2"
            sx={{ color: "var(--ink)", fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.85rem" }, lineHeight: 1.02, maxWidth: 720 }}
          >
            Steady care is built from ordinary details.
          </Typography>
        </Box>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.8, maxWidth: 470 }}>
          Trust is less about a grand promise than knowing who will arrive, what they will pay attention to, and how your pet&apos;s familiar day will be respected.
        </Typography>
      </Box>

      <Box
        component="dl"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
          m: 0,
          borderBlock: "1px solid var(--plum-line)"
        }}
      >
        {principles.map((principle, index) => (
          <Box
            component="div"
            key={principle.title}
            sx={{
              minHeight: { lg: 245 },
              py: { xs: 3.25, lg: 4 },
              pr: { xs: 0, sm: index % 2 === 0 ? 3.5 : 0, lg: index === principles.length - 1 ? 0 : 3.5 },
              pl: { xs: 0, sm: index % 2 === 1 ? 3.5 : 0, lg: index === 0 ? 0 : 3.5 },
              borderTop: {
                xs: index === 0 ? 0 : "1px solid var(--plum-line-soft)",
                sm: index < 2 ? 0 : "1px solid var(--plum-line-soft)",
                lg: 0
              },
              borderLeft: {
                xs: 0,
                sm: index % 2 === 1 ? "1px solid var(--plum-line)" : 0,
                lg: index === 0 ? 0 : "1px solid var(--plum-line)"
              }
            }}
          >
            <Typography component="dt" sx={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: { xs: "1.5rem", md: "1.7rem" }, fontWeight: 700, lineHeight: 1.15, mb: 1.25 }}>
              {principle.title}
            </Typography>
            <Typography component="dd" sx={{ color: "var(--muted-ink)", fontSize: "0.96rem", lineHeight: 1.75, m: 0 }}>
              {principle.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
