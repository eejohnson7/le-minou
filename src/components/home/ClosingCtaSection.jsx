import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CtaLink from "../layout/CtaLink";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function ClosingCtaSection() {
  return (
    <Section
      id="request-care"
      aria-labelledby="closing-title"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "var(--soft-pink)",
        borderBlock: "1px solid var(--plum-line)",
        py: { xs: 8, sm: 10, md: 13 }
      }}
      containerSx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.42fr) minmax(240px, 0.58fr)" },
        alignItems: "end",
        gap: { xs: 5, md: 8 }
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: { xs: -36, md: -72 },
          right: { xs: 18, md: "24%" },
          width: "1px",
          height: { xs: 170, md: 300 },
          bgcolor: "var(--plum-line)",
          transform: "rotate(22deg)",
          transformOrigin: "top"
        }}
      />
      <Box>
        <SectionEyebrow sx={{ mb: 1.5 }}>Ready when you are</SectionEyebrow>
        <Typography
          id="closing-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "3.1rem", sm: "4.6rem", md: "5.8rem" }, lineHeight: 0.93, maxWidth: 900 }}
        >
          Need a hand?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1.75,
          borderLeft: { md: "1px solid var(--plum-line)" },
          pl: { md: 4 },
          pb: { md: 0.75 }
        }}
      >
        <CtaLink to="/request-care" sx={{ minWidth: 170 }}>Request care</CtaLink>
      </Box>
    </Section>
  );
}
