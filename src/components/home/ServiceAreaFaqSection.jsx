import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import SectionHeading, { SectionEyebrow } from "../layout/SectionHeading";

const questions = [
  {
    question: "What kind of care does Le Minou provide?",
    answer: "Le Minou offers boutique cat care, dog walking, and thoughtful in-home pet care built around each pet’s existing routine."
  },
  {
    question: "Who will be caring for my pets?",
    answer: "Le Minou is owner-operated, so care comes from Erin rather than a marketplace of rotating sitters."
  },
  {
    question: "Where is Le Minou available?",
    answer: "Le Minou currently serves Chicago’s North Side. Exact neighborhood and travel boundaries will be confirmed during the request process."
  }
];

export default function ServiceAreaFaqSection() {
  return (
    <Section
      aria-labelledby="service-area-title"
      sx={{ bgcolor: "var(--paper)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 0.7fr) minmax(0, 1.3fr)" },
        gap: { xs: 6, md: 10 }
      }}
    >
      <Box>
        <SectionEyebrow sx={{ mb: 1.5 }}>07 · Service area</SectionEyebrow>
        <Typography
          id="service-area-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.3rem", md: "3.25rem" }, lineHeight: 1.05 }}
        >
          Close to home on Chicago&apos;s North Side.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: "1rem", lineHeight: 1.75, mt: 2.5, maxWidth: 420 }}>
          The service area remains intentionally local. Specific neighborhood coverage will be confirmed when you request care.
        </Typography>
      </Box>

      <Box component="section" aria-labelledby="faq-title">
        <SectionHeading id="faq-title" eyebrow="A few useful answers" title="Before you ask" maxWidth={520} sx={{ mb: 2.5 }} />
        <Box sx={{ borderBottom: "1px solid var(--plum-line)" }}>
          {questions.map((item) => (
            <Box
              component="details"
              key={item.question}
              sx={{
                borderTop: "1px solid var(--plum-line)",
                "&[open] .faq-icon": { transform: "rotate(45deg)" }
              }}
            >
              <Box
                component="summary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 2.25,
                  cursor: "pointer",
                  listStyle: "none",
                  "&::-webkit-details-marker": { display: "none" }
                }}
              >
                <Typography component="span" sx={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: { xs: "1.08rem", sm: "1.22rem" }, fontWeight: 700 }}>
                  {item.question}
                </Typography>
                <AddRoundedIcon className="faq-icon" aria-hidden="true" sx={{ color: "var(--plum)", flexShrink: 0, transition: "transform 160ms ease" }} />
              </Box>
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.96rem", lineHeight: 1.75, maxWidth: 650, pb: 2.5, pr: 5 }}>
                {item.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
