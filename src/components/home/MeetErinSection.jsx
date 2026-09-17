import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import erinPhoto from "../../assets/photos/erin.jpg";
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
        sx={{ width: "calc(100% - 1rem)", maxWidth: 460, mr: 1 }}
        mediaSx={{ aspectRatio: "4 / 5", bgcolor: "var(--paper)" }}
      >
        <Box
          component="img"
          src={erinPhoto}
          alt="Erin, owner and caregiver at Le Minou"
          width={360}
          height={480}
          loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </EditorialImageSlot>

      <Box>
        <SectionEyebrow sx={{ mb: 1.5 }}>Meet Erin</SectionEyebrow>
        <Typography
          id="meet-erin-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" }, lineHeight: 1.02, mb: 3 }}
        >
          Hi, I’m Erin.
        </Typography>
        <Typography sx={{ color: "var(--ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8, fontWeight: 700 }}>
          I run Le Minou and care for your pets myself. I’ll get to know their routines so they feel comfortable while you’re away.
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
          More about me <ArrowForwardRoundedIcon sx={{ fontSize: 19 }} />
        </Link>
      </Box>
    </Section>
  );
}
