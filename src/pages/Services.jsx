import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink } from "react-router-dom";
import ServiceDetail from "../components/services/ServiceDetail";
import CtaLink from "../components/layout/CtaLink";
import PageContainer from "../components/layout/PageContainer";
import Section from "../components/layout/Section";
import { SectionEyebrow } from "../components/layout/SectionHeading";
import { ADDONS, SERVICE_DETAILS } from "../data/services";

const displayServiceLabel = (label) =>
  label.toLowerCase().replace(/(^|\s)\S/g, (character) => character.toUpperCase());

const carePrinciples = [
  {
    number: "01",
    title: "Owner-operated",
    description: "The person who learns the routine is the person who shows up."
  },
  {
    number: "02",
    title: "Routine-aware",
    description: "Care follows the rhythms and preferences your pet already knows."
  },
  {
    number: "03",
    title: "Clearly communicated",
    description: "Updates stay thoughtful, predictable, and useful while you are away."
  }
];

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
            <SectionEyebrow sx={{ mb: 1.5 }}>Services &amp; Pricing</SectionEyebrow>
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
              Care that follows their routine—not a preset package.
            </Typography>
          </Box>
          <Box sx={{ borderLeft: { md: "1px solid var(--plum-line)" }, pl: { md: 4 }, pb: { md: 0.75 } }}>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, mb: 2.5 }}>
              Calm in-home visits and structured dog walks, with clear pricing and care shaped around the routines your pet already knows.
            </Typography>
            <CtaLink to="/request-care">Request care</CtaLink>
          </Box>
        </PageContainer>
      </Box>

      <Section aria-labelledby="service-menu-title" sx={{ bgcolor: "var(--blush)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 3, mb: { xs: 4, md: 6 } }}>
          <Box>
            <SectionEyebrow sx={{ mb: 1.25 }}>The service menu</SectionEyebrow>
            <Typography
              id="service-menu-title"
              component="h2"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2.3rem", sm: "3rem", md: "3.5rem" }, lineHeight: 1 }}
            >
              Thoughtful options, clearly priced.
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
            <SectionEyebrow sx={{ mb: 1.25 }}>Add-ons</SectionEyebrow>
            <Typography
              id="addons-title"
              component="h2"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2.25rem", md: "3rem" }, lineHeight: 1.02, mb: 1.5 }}
            >
              A little extra care.
            </Typography>
            <Typography sx={{ color: "var(--muted-ink)", lineHeight: 1.75, maxWidth: 430 }}>
              Straightforward additions to the core service menu, kept clear and separate from the visit itself.
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
        aria-labelledby="choosing-care-title"
        sx={{ bgcolor: "var(--cream)" }}
        containerSx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 0.75fr) minmax(0, 1.25fr)" },
          gap: { xs: 6, md: 11 },
          alignItems: "start"
        }}
      >
        <Box sx={{ position: { md: "sticky" }, top: { md: 116 } }}>
          <SectionEyebrow sx={{ mb: 1.25 }}>Choosing care</SectionEyebrow>
          <Typography
            id="choosing-care-title"
            component="h2"
            variant="h2"
            sx={{ color: "var(--ink)", fontSize: { xs: "2.45rem", sm: "3.1rem", md: "3.7rem" }, lineHeight: 1, mb: 2 }}
          >
            Not sure what fits?
          </Typography>
          <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.75, maxWidth: 470, mb: 2.5 }}>
            Visit options and dog walks are listed separately, but your pet does not have to fit neatly into a label. Share the routine and what you need through Request Care, and begin with a conversation.
          </Typography>
          <Box
            component={RouterLink}
            to="/request-care"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.65,
              color: "var(--plum)",
              fontSize: "0.92rem",
              fontWeight: 700,
              textDecoration: "none",
              "& svg": { transition: "transform 160ms ease" },
              "&:hover svg": { transform: "translate(3px, -3px)" }
            }}
          >
            Start a care request <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <Box>
          <SectionEyebrow sx={{ mb: 1.5 }}>What stays consistent</SectionEyebrow>
          <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, borderBottom: "1px solid var(--plum-line)" }}>
            {carePrinciples.map((principle, index) => (
              <Box
                component="li"
                key={principle.number}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "3rem minmax(0, 1fr)", sm: "4.25rem minmax(0, 1fr)" },
                  gap: 1.5,
                  borderTop: "1px solid var(--plum-line)",
                  py: { xs: 3, sm: 3.5 },
                  ml: { md: index === 1 ? 4 : 0 },
                  mr: { md: index !== 1 ? 4 : 0 }
                }}
              >
                <Typography sx={{ color: "var(--plum)", fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 700, pt: 0.5 }}>
                  {principle.number}
                </Typography>
                <Box>
                  <Typography component="h3" variant="h3" sx={{ color: "var(--ink)", fontSize: { xs: "1.4rem", sm: "1.7rem" }, mb: 0.65 }}>
                    {principle.title}
                  </Typography>
                  <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 510 }}>
                    {principle.description}
                  </Typography>
                </Box>
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
          <SectionEyebrow light sx={{ mb: 1.5 }}>The next step</SectionEyebrow>
          <Typography
            id="services-closing-title"
            component="h2"
            variant="h2"
            sx={{ color: "var(--paper)", fontSize: { xs: "3rem", sm: "4.25rem", md: "5rem" }, lineHeight: 0.95, maxWidth: 800 }}
          >
            Not sure which visit fits your pet?
          </Typography>
        </Box>
        <Box sx={{ borderLeft: { md: "1px solid rgba(255,255,255,0.16)" }, pl: { md: 4 } }}>
          <Typography sx={{ color: "rgba(255, 253, 251, 0.72)", fontSize: "1rem", lineHeight: 1.75, mb: 2.5 }}>
            Tell Le Minou about the routine, the pets, and what care would make time away feel easier. Request Care is the start of a conversation—not a checkout screen.
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
            <Box
              component={RouterLink}
              to="/about"
              sx={{ color: "rgba(255, 253, 251, 0.78)", fontSize: "0.88rem", fontWeight: 700, textUnderlineOffset: "4px", "&:hover": { color: "var(--paper)" } }}
            >
              About Le Minou
            </Box>
          </Box>
        </Box>
      </Section>
    </>
  );
}
