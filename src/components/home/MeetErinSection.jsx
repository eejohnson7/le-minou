import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Section from "../layout/Section";
import { SectionEyebrow } from "../layout/SectionHeading";
import EditorialImageSlot from "./EditorialImageSlot";

export default function MeetErinSection() {
  return (
    <Section
      aria-labelledby="meet-erin-title"
      sx={{ bgcolor: "var(--soft-pink)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(300px, 0.85fr) minmax(0, 1.15fr)" },
        alignItems: "center",
        gap: { xs: 5, md: 8, lg: 10 }
      }}
    >
      <EditorialImageSlot
        footerLabel="Owner + caregiver"
        sx={{ width: "calc(100% - 1rem)", maxWidth: 460, mr: 1 }}
        mediaSx={{ aspectRatio: "4 / 5", bgcolor: "var(--paper)" }}
      >
        <Box component="img" src={logo} alt="" sx={{ width: "58%", height: "auto", opacity: 0.88 }} />
      </EditorialImageSlot>

      <Box>
        <SectionEyebrow sx={{ mb: 1.5 }}>05 · Meet Erin</SectionEyebrow>
        <Typography
          id="meet-erin-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" }, lineHeight: 1.02, mb: 3 }}
        >
          A steady presence, with the details already in mind.
        </Typography>
        <Typography sx={{ color: "var(--ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8, fontWeight: 700 }}>
          Le Minou is owner-operated. Erin is the person clients meet, the person who learns the routines, and the person who shows up for pets and home.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8, mt: 2 }}>
          The business began as a practical answer to a familiar problem: finding pet care that felt genuinely trustworthy. Erin was already the person friends and neighbors called—the one who noticed routines, tracked the little things, and brought calm into the home.
        </Typography>
        <Link
          component={RouterLink}
          to="/about"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "var(--plum)",
            fontWeight: 700,
            mt: 3,
            "& svg": { transition: "transform 160ms ease" },
            "&:hover svg": { transform: "translateX(4px)" }
          }}
        >
          Read Erin&apos;s story <ArrowForwardRoundedIcon sx={{ fontSize: 19 }} />
        </Link>
      </Box>
    </Section>
  );
}
