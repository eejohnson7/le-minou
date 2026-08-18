import Box from "@mui/material/Box";
import { HOMEPAGE_SERVICES } from "../../data/services";
import Section from "../layout/Section";
import SectionHeading from "../layout/SectionHeading";
import ServiceRow from "./ServiceRow";

export default function ServicesSection() {
  return (
    <Section aria-labelledby="services-title" sx={{ bgcolor: "var(--blush)" }}>
      <SectionHeading
        id="services-title"
        eyebrow="03 · Services"
        title="Care shaped around the pet—not the template."
        description="Straightforward options for the routines that matter most, with pricing kept clear and secondary to the care itself."
      />
      <Box sx={{ borderBottom: "1px solid var(--plum-line)" }}>
        {HOMEPAGE_SERVICES.map((service) => (
          <ServiceRow key={service.number} {...service} />
        ))}
      </Box>
    </Section>
  );
}

