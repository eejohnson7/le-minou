import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import aboutPhoto from "../../assets/photos/about-dog.jpg";
import EditorialImageSlot from "../home/EditorialImageSlot";
import Section from "../layout/Section";

export default function MeetErinAboutSection() {
  return (
    <Section
      aria-labelledby="about-erin-title"
      sx={{ bgcolor: "var(--blush)", borderBlock: "1px solid var(--plum-line-soft)" }}
      containerSx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.08fr) minmax(320px, 0.92fr)" },
        gridTemplateAreas: { xs: '"intro" "portrait"', md: '"intro portrait"' },
        columnGap: { md: 9, lg: 12 },
        rowGap: { xs: 5, md: 4 },
        alignItems: "center"
      }}
    >
      <Box sx={{ gridArea: "intro" }}>
        <Typography
          id="about-erin-title"
          component="h2"
          variant="h2"
          sx={{ color: "var(--ink)", fontSize: { xs: "2.65rem", sm: "3.35rem", md: "4.1rem" }, lineHeight: 1, maxWidth: 620 }}
        >
          A familiar face for your pets.
        </Typography>
        <Typography sx={{ color: "var(--ink)", fontSize: { xs: "1.02rem", md: "1.1rem" }, fontWeight: 700, lineHeight: 1.8, mt: 3, maxWidth: 660 }}>
          I started pet sitting on the side in Louisiana in 2024 while working full time. I moved to Chicago in 2025, was laid off in August, and returned to pet sitting that November. That’s how Le Minou began.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.8, mt: 2, maxWidth: 650 }}>
          I’ve cared for puppies, senior dogs, and cats, including giving medication to cats and dogs. I also worked at a veterinary clinic during college.
        </Typography>
      </Box>

      <EditorialImageSlot
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
        <Box
          component="img"
          src={aboutPhoto}
          alt="A small fluffy dog being held outdoors"
          width={360}
          height={480}
          loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </EditorialImageSlot>

    </Section>
  );
}
