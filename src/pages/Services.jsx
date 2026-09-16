import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ServiceDetail from "../components/services/ServiceDetail";
import CtaLink from "../components/layout/CtaLink";
import PageContainer from "../components/layout/PageContainer";
import Section from "../components/layout/Section";
import { ADDONS, SERVICE_DETAILS } from "../data/services";

const displayServiceLabel = (label) =>
  label.toLowerCase().replace(/(^|\s)\S/g, (character) => character.toUpperCase());

export default function Services() {
  return (
    <>
      <Box
        component="header"
        aria-labelledby="services-page-title"
        sx={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--plum-line)",
          py: { xs: 7.5, sm: 9, md: 11 }
        }}
      >
        <PageContainer
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.45fr) minmax(260px, 0.55fr)" },
            alignItems: "end",
            gap: { xs: 4, md: 8 }
          }}
        >
          <Box>
            <Typography
              id="services-page-title"
              component="h1"
              variant="h1"
              sx={{
                color: "var(--ink)",
                fontSize: { xs: "3.1rem", sm: "4.3rem", md: "5.65rem" },
                lineHeight: 0.94,
                maxWidth: 850
              }}
            >
              Services &amp; pricing.
            </Typography>
          </Box>
          <Box sx={{ borderLeft: { md: "1px solid var(--plum-line)" }, pl: { md: 4 }, pb: { md: 0.75 } }}>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, mb: 2.5 }}>
              Cat visits and dog walks, with care from Erin.
            </Typography>
            <CtaLink to="/request-care">Request care</CtaLink>
          </Box>
        </PageContainer>
      </Box>

      <Section aria-labelledby="service-menu-title" sx={{ bgcolor: "var(--blush)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 3, mb: { xs: 4, md: 6 } }}>
          <Box>
            <Typography
              id="service-menu-title"
              component="h2"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2.3rem", sm: "3rem", md: "3.5rem" }, lineHeight: 1 }}
            >
              Choose your care.
            </Typography>
          </Box>
        </Box>

        <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, borderBottom: "1px solid var(--plum-line)" }}>
          {SERVICE_DETAILS.map((service, index) => (
            <ServiceDetail key={service.number} service={service} index={index} />
          ))}
        </Box>

        <Box
          aria-labelledby="addons-title"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 0.8fr) minmax(0, 1.2fr)" },
            gap: { xs: 3, md: 9 },
            alignItems: "start",
            mt: { xs: 7, md: 10 }
          }}
        >
          <Box>
            <Typography
              id="addons-title"
              component="h2"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2.25rem", md: "3rem" }, lineHeight: 1.02, mb: 1.5 }}
            >
              Extra charges.
            </Typography>
            <Typography sx={{ color: "var(--muted-ink)", lineHeight: 1.75, maxWidth: 430 }}>
              Added to the visit price when needed.
            </Typography>
          </Box>

          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, borderBottom: "1px solid var(--plum-line)" }}>
            {ADDONS.map((addon, index) => (
              <Box
                component="li"
                key={addon.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2.5rem minmax(0, 1fr) auto",
                  alignItems: "baseline",
                  gap: { xs: 1, sm: 2 },
                  borderTop: "1px solid var(--plum-line)",
                  py: { xs: 2.5, sm: 3 }
                }}
              >
                <Typography aria-hidden="true" sx={{ color: "var(--plum)", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700 }}>
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography sx={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: { xs: "1.25rem", sm: "1.55rem" }, fontWeight: 700 }}>
                  {displayServiceLabel(addon.label)}
                </Typography>
                <Typography sx={{ color: "var(--ink)", fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: 700, textAlign: "right" }}>
                  {addon.price}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>

      <Section
        aria-labelledby="services-closing-title"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "var(--deep-plum)",
          py: { xs: 8, sm: 10, md: 12 }
        }}
        containerSx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.32fr) minmax(260px, 0.68fr)" },
          gap: { xs: 5, md: 9 },
          alignItems: "end"
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: { xs: -56, md: -110 },
            right: { xs: 22, md: "28%" },
            width: { xs: 170, md: 310 },
            height: { xs: 170, md: 310 },
            border: "1px solid rgba(247, 183, 207, 0.2)",
            borderRadius: "50%"
          }}
        />
        <Box>
          <Typography
            id="services-closing-title"
            component="h2"
            variant="h2"
            sx={{ color: "var(--paper)", fontSize: { xs: "3rem", sm: "4.25rem", md: "5rem" }, lineHeight: 0.95, maxWidth: 800 }}
          >
            Need help choosing?
          </Typography>
        </Box>
        <Box sx={{ borderLeft: { md: "1px solid rgba(255,255,255,0.16)" }, pl: { md: 4 } }}>
          <Typography sx={{ color: "rgba(255, 253, 251, 0.72)", fontSize: "1rem", lineHeight: 1.75, mb: 2.5 }}>
            Tell me what your pet needs. We’ll find the right fit.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
            <CtaLink
              to="/request-care"
              sx={{
                color: "var(--plum)",
                bgcolor: "var(--paper)",
                borderColor: "var(--paper)",
                "&:hover": { color: "var(--deep-plum)", bgcolor: "var(--soft-pink)", borderColor: "var(--soft-pink)" }
              }}
            >
              Request care
            </CtaLink>
          </Box>
        </Box>
      </Section>
    </>
  );
}
