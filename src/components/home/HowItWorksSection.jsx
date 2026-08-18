import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";
import ProcessStep from "./ProcessStep";

const steps = [
  {
    number: "01",
    title: "Request care",
    description: "Tell me about your pets, routines, and what you need."
  },
  {
    number: "02",
    title: "Let’s meet",
    description: "We make sure the care setup feels right for everyone."
  },
  {
    number: "03",
    title: "Build the care plan",
    description: "Important routines, home notes, feeding, medications, and preferences live in one place."
  },
  {
    number: "04",
    title: "Visits + updates",
    description: "Your pets keep their routines and you know how they’re doing."
  }
];

export default function HowItWorksSection() {
  return (
    <Section
      aria-labelledby="process-title"
      sx={{ bgcolor: "var(--deep-plum)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 0.8fr) minmax(0, 1.2fr)" },
        alignItems: "start",
        gap: { xs: 5, md: 9, lg: 12 }
      }}
    >
      <Box>
        <SectionEyebrow light sx={{ mb: 1.25 }}>06 · How it works</SectionEyebrow>
        <Typography
          id="process-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--paper)", fontSize: { xs: "2.35rem", sm: "2.9rem", md: "3.65rem" }, lineHeight: 1.02 }}
        >
          A clear beginning makes calmer care.
        </Typography>
        <Typography sx={{ color: "rgba(255, 253, 251, 0.72)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, mt: 2.25, maxWidth: 430 }}>
          The process stays personal and straightforward from the first conversation through every visit.
        </Typography>
      </Box>
      <Box
        component="ol"
        sx={{
          m: 0,
          p: 0
        }}
      >
        {steps.map((step) => (
          <ProcessStep key={step.number} number={step.number} title={step.title}>
            {step.description}
          </ProcessStep>
        ))}
      </Box>
    </Section>
  );
}
