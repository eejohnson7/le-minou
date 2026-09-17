import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Section from "../layout/Section";
import SectionHeading from "../layout/SectionHeading";

// Selected excerpts from Erin's Rover reviews; maintained manually.
const reviews = [
  { name: "Amanda B.", text: "She was super professional, prompt", care: "Cat care" },
  { name: "Fiona R.", text: "She took great care of both of our kitties", care: "Cat care" },
  { name: "Nathan L.", text: "Communicative, knowledgeable, and kind.", care: "Dog walking" }
];

export default function ReviewsSection() {
  return (
    <Section aria-labelledby="reviews-title" sx={{ bgcolor: "var(--paper)" }}>
      <SectionHeading id="reviews-title" title="Kind words" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 3, md: 4 }
        }}
      >
        {reviews.map((review) => (
          <Box
            component="figure"
            key={review.name}
            sx={{ m: 0, borderTop: "1px solid var(--plum-line)", pt: 3 }}
          >
            <Typography
              component="blockquote"
              sx={{ m: 0, mb: 2, color: "var(--ink)", fontSize: "1.15rem", lineHeight: 1.7 }}
            >
              “{review.text}”
            </Typography>
            <Box component="figcaption">
              <Typography sx={{ color: "var(--ink)", fontWeight: 700 }}>{review.name}</Typography>
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.9rem" }}>
                {review.care} · Rover review excerpt
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Link
        href="https://www.rover.com/sit/erinj88713"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, mt: 4, color: "var(--plum)", fontWeight: 700 }}
      >
        Read more on Rover <ArrowForwardRoundedIcon sx={{ fontSize: 19 }} />
      </Link>
    </Section>
  );
}
