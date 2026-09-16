import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import CtaLink from "../layout/CtaLink";
import PageContainer from "../layout/PageContainer";
import { SectionEyebrow } from "../layout/SectionHeading";
import EditorialImageSlot from "./EditorialImageSlot";

export default function HeroSection() {
  return (
    <Box component="section" aria-labelledby="home-title" sx={{ position: "relative", overflow: "hidden", bgcolor: "var(--cream)" }}>
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "64%",
          width: "1px",
          bgcolor: "var(--plum-line-soft)"
        }}
      />
      <PageContainer
        sx={{
          minHeight: { md: "calc(100vh - 78px)" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.32fr) minmax(320px, 0.68fr)" },
          alignItems: "center",
          gap: { xs: 4.5, sm: 6, md: 7, lg: 9 },
          py: { xs: 4.5, sm: 7, md: 9 }
        }}
      >
        <Box sx={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: { xs: 1, sm: 1.5 }, mb: 2 }}>
            <SectionEyebrow>North Side Chicago</SectionEyebrow>
          </Box>
          <Typography
            id="home-title"
            component="h1"
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "3.05rem", sm: "4.55rem", md: "5.35rem", lg: "6.05rem" },
              lineHeight: { xs: 0.98, md: 0.93 },
              mb: { xs: 2.5, md: 3 }
            }}
          >
            Pet care at home.
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "var(--muted-ink)",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              lineHeight: 1.7,
              maxWidth: 660
            }}
          >
            Cat visits and dog walks with Erin. Familiar routines, happy pets.
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: { xs: 1.75, sm: 2.25 }, mt: { xs: 3, md: 4 } }}>
            <CtaLink to="/request-care">Request care</CtaLink>
            <Link
              component={RouterLink}
              to="/services"
              underline="none"
              sx={{
                color: "var(--plum)",
                fontSize: "0.95rem",
                fontWeight: 700,
                borderBottom: "1px solid var(--plum-line)",
                pb: 0.35,
                transition: "border-color 160ms ease",
                "&:hover": { borderColor: "var(--plum)" }
              }}
            >
              Services & pricing
            </Link>
          </Box>
        </Box>

        <EditorialImageSlot
          footerLabel="Cats · Dogs · Home"
          sx={{
            width: { xs: "calc(100% - 1rem)", sm: "min(84%, 470px)", md: "100%" },
            maxWidth: 450,
            ml: { xs: 0, sm: "auto" },
            mr: { xs: 1, md: 0 },
            transform: { md: "translateY(1.5rem)" }
          }}
        >
          <Typography
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: { xs: 12, md: 28 },
              left: { xs: 18, md: 24 },
              color: "rgba(152, 0, 97, 0.1)",
              fontFamily: "var(--font-display)",
              fontSize: { xs: "4rem", md: "6rem" },
              fontWeight: 700,
              lineHeight: 1
            }}
          >
            01
          </Typography>
          <Box
            component="img"
            src={logo}
            alt="Le Minou cat mark"
            sx={{
              width: { xs: "58%", sm: "54%", md: "70%" },
              height: "auto",
              display: "block",
              transform: { xs: "translate(12%, 2%)", md: "translate(3%, -1%)" }
            }}
          />
        </EditorialImageSlot>
      </PageContainer>
    </Box>
  );
}
