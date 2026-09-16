import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ADDONS, HOMEPAGE_SERVICES } from "../../data/services";
import Section from "../layout/Section";
import SectionHeading from "../layout/SectionHeading";
import ServiceRow from "./ServiceRow";

export default function ServicesSection() {
  return (
    <Section aria-labelledby="services-title" sx={{ bgcolor: "var(--blush)" }}>
      <SectionHeading
        id="services-title"
        title="A little help with pet care."
      />
      <Box sx={{ borderBottom: "1px solid var(--plum-line)" }}>
        {HOMEPAGE_SERVICES.map((service) => (
          <ServiceRow key={service.number} {...service} />
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography component="h3" sx={{ color: "var(--ink)", fontWeight: 700, mb: 1 }}>
          Extra charges
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: "var(--muted-ink)" }}>
          {ADDONS.map((addon) => (
            <Typography component="li" key={addon.label} sx={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
              {addon.label.charAt(0) + addon.label.slice(1).toLowerCase()}: {addon.price}
            </Typography>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

