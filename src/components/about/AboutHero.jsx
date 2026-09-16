import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageContainer from "../layout/PageContainer";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function AboutHero() {
  return (
    <Box
      component="header"
      aria-labelledby="about-page-title"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "var(--cream)",
        borderBottom: "1px solid var(--plum-line-soft)"
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: { xs: 30, md: 56 },
          right: { xs: -78, md: "7%" },
          width: { xs: 170, md: 260 },
          height: { xs: 170, md: 260 },
          border: "1px solid var(--plum-line-soft)",
          borderRadius: "50%"
        }}
      />

      <PageContainer
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(190px, 0.46fr) minmax(0, 1.54fr)" },
          gap: { xs: 5, md: 8, lg: 11 },
          alignItems: "end",
          py: { xs: 7.5, sm: 10, md: 13 }
        }}
      >
        <Box sx={{ maxWidth: { xs: 440, md: 230 } }}>
          <SectionEyebrow sx={{ mb: 2 }}>About Le Minou</SectionEyebrow>

        </Box>

        <Box sx={{ maxWidth: 850 }}>
          <Typography
            id="about-page-title"
            component="h1"
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "3.15rem", sm: "4.15rem", md: "4.85rem", lg: "5.2rem" },
              lineHeight: { xs: 0.99, md: 0.96 },
              maxWidth: 780
            }}
          >
            Hi, I’m Erin.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: { xs: 2, sm: 5 },
              alignItems: "start",
              borderTop: "1px solid var(--plum-line)",
              mt: { xs: 3, md: 4 },
              pt: { xs: 2.5, md: 3 }
            }}
          >
            <Typography sx={{ color: "var(--ink)", fontSize: { xs: "1.05rem", md: "1.16rem" }, fontWeight: 700, lineHeight: 1.7 }}>
              I run Le Minou, a cat care and dog walking service on Chicago’s North Side.
            </Typography>
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
}
