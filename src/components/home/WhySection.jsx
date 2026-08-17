import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import SectionHeading from "../layout/SectionHeading";

const principles = [
  {
    number: "01",
    title: "One familiar caregiver",
    description: "You know who is entering your home and who your pets will see each visit."
  },
  {
    number: "02",
    title: "Routine-aware care",
    description: "Care adapts to the animal instead of forcing every pet into the same process."
  },
  {
    number: "03",
    title: "Clear updates",
    description: "Communication stays thoughtful, predictable, and useful while you are away."
  },
  {
    number: "04",
    title: "Owner-level attention",
    description: "Le Minou is an owner-operated service—not a marketplace of rotating sitters."
  }
];

export default function WhySection() {
  return (
    <Section
      aria-labelledby="why-title"
      sx={{ bgcolor: "var(--cream)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(250px, 0.78fr) minmax(0, 1.22fr)" },
        alignItems: "start",
        gap: { xs: 2, md: 9, lg: 12 }
      }}
    >
      <Box sx={{ position: { md: "sticky" }, top: { md: 118 }, pb: { xs: 2, md: 0 } }}>
        <SectionHeading
          id="why-title"
          eyebrow="04 · Why Le Minou"
          title="Small by design. Attentive on purpose."
          sx={{ mb: 2.5 }}
        />
        <Typography
          className="handwritten-accent"
          sx={{ color: "var(--plum)", fontSize: "1.08rem", transform: "rotate(-2deg)", transformOrigin: "left" }}
        >
          care, kept close
        </Typography>
      </Box>
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0
        }}
      >
        {principles.map((principle, index) => (
          <Box
            component="li"
            key={principle.number}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "2.75rem minmax(0, 1fr)", sm: "4rem minmax(0, 1fr)" },
              gap: { xs: 1.5, sm: 2 },
              borderTop: "1px solid var(--plum-line)",
              py: { xs: 3, md: 4 },
              ml: { md: index % 2 === 1 ? 5 : 0 },
              mr: { md: index % 2 === 0 ? 5 : 0 }
            }}
          >
            <Typography sx={{ color: "var(--plum)", fontFamily: "monospace", fontSize: "0.74rem", fontWeight: 700, pt: 0.5 }}>
              {principle.number}
            </Typography>
            <Box>
              <Typography component="h3" variant="h3" sx={{ color: "var(--ink)", fontSize: { xs: "1.35rem", sm: "1.75rem" }, mb: 0.75 }}>
                {principle.title}
              </Typography>
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.96rem", lineHeight: 1.7, maxWidth: 470 }}>
                {principle.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
