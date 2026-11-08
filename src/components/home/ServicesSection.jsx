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
        title="A little help with pet care."
      />
      <Box sx={{ borderBottom: "1px solid var(--plum-line)" }}>
        {HOMEPAGE_SERVICES.map((service) => (
          <ServiceRow key={service.number} {...service} />
        ))}
      </Box>
    </Section>
  );
}

