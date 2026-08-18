import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.png";
import EditorialImageSlot from "../home/EditorialImageSlot";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function MeetErinAboutSection() {
  return (
    <Section
      aria-labelledby="about-erin-title"
      sx={{ bgcolor: "var(--blush)", borderBlock: "1px solid var(--plum-line-soft)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.08fr) minmax(320px, 0.92fr)" },
        gridTemplateAreas: { xs: '"intro" "portrait" "detail"', md: '"intro portrait" "detail portrait"' },
        columnGap: { md: 9, lg: 12 },
        rowGap: { xs: 5, md: 4 },
        alignItems: "start"
      }}
    >
      <Box sx={{ gridArea: "intro", alignSelf: "end" }}>
        <SectionEyebrow sx={{ mb: 1.5 }}>Meet Erin</SectionEyebrow>
        <Typography
          id="about-erin-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.65rem", sm: "3.35rem", md: "4.1rem" }, lineHeight: 1, maxWidth: 620 }}
        >
          One person, from the first conversation onward.
        </Typography>
        <Typography sx={{ color: "var(--ink)", fontSize: { xs: "1.02rem", md: "1.1rem" }, fontWeight: 700, lineHeight: 1.8, mt: 3, maxWidth: 660 }}>
          Erin is the owner and caregiver behind Le Minou. She is the person clients meet, the person who learns how each pet moves through the day, and the person who returns to care for them in their own home.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.8, mt: 2, maxWidth: 650 }}>
          That continuity is intentional. It gives pets a familiar presence and gives clients a direct relationship with the person following the routine, caring for the home, and paying attention when something feels different.
        </Typography>
      </Box>

      <EditorialImageSlot
        cropLabel="Portrait · 4:5 crop"
        footerLabel="Erin · Owner + caregiver"
        sx={{
          gridArea: "portrait",
          width: { xs: "calc(100% - 1rem)", sm: "min(78%, 480px)", md: "calc(100% - 1rem)" },
          maxWidth: 480,
          mx: { xs: 0, sm: "auto", md: 0 },
          mr: { xs: 1, sm: "auto", md: 1 },
          transform: { md: "translateY(1.5rem)" }
        }}
        mediaSx={{ aspectRatio: "4 / 5", bgcolor: "var(--paper)" }}
      >
        <Box component="img" src={logo} alt="" sx={{ width: "58%", height: "auto", opacity: 0.88 }} />
      </EditorialImageSlot>

      <Box sx={{ gridArea: "detail", alignSelf: "start" }}>
        <Box sx={{ borderTop: "1px solid var(--plum-line)", pt: 2.75 }}>
          <SectionEyebrow sx={{ mb: 1.25 }}>A useful background</SectionEyebrow>
          <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "0.98rem", md: "1.03rem" }, lineHeight: 1.8, maxWidth: 650 }}>
            Erin&apos;s background in backend engineering reinforced habits that matter here too: documenting details, thinking through edge cases, and building reliable systems. Those habits shape how Le Minou is run, with thoughtful preparation and less room for guesswork.
          </Typography>
        </Box>
        <Typography sx={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: { xs: "1.28rem", md: "1.48rem" }, fontWeight: 700, lineHeight: 1.5, mt: 3.5, maxWidth: 620 }}>
          She has always been drawn to the quieter rhythms of animals: the expressive stillness of cats, the grounding pattern of a dog walk, and the trust that grows through familiarity.
        </Typography>
      </Box>
    </Section>
  );
}
