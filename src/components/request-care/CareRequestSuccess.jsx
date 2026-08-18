import { useEffect, useRef } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import PageContainer from "../layout/PageContainer";
import { SectionEyebrow } from "../layout/SectionHeading";

export default function CareRequestSuccess({ name }) {
  const headingRef = useRef(null);
  const firstName = name.trim().split(/\s+/)[0];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    headingRef.current?.focus();
  }, []);

  return (
    <Box
      component="section"
      aria-labelledby="care-request-success-title"
      sx={{ bgcolor: "var(--paper)", minHeight: "68vh", py: { xs: 9, sm: 12, md: 15 } }}
    >
      <PageContainer narrow>
        <Box role="status" aria-live="polite">
          <SectionEyebrow sx={{ mb: 1.5 }}>Request received</SectionEyebrow>
          <Typography
            ref={headingRef}
            id="care-request-success-title"
            component="h1"
            variant="h1"
            tabIndex={-1}
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "3rem", sm: "4rem", md: "4.65rem" },
              lineHeight: 0.98,
              outline: "none"
            }}
          >
            Got it{firstName ? `, ${firstName}` : ""} — I have the basics.
          </Typography>
          <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8, mt: 3, maxWidth: 650 }}>
            Your care request was received. Erin will review what you shared and follow up about fit and next steps.
          </Typography>
          <Typography sx={{ color: "var(--ink)", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.7, mt: 2 }}>
            This is not a confirmed booking or a reservation of dates.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: { xs: 2, sm: 2.5 }, borderTop: "1px solid var(--plum-line)", mt: 5, pt: 3 }}>
          <Button component={RouterLink} to="/" variant="plum-contained" endIcon={<ArrowForwardRoundedIcon />}>
            Back home
          </Button>
          <Link component={RouterLink} to="/services" sx={{ color: "var(--plum)", fontSize: "0.92rem", fontWeight: 700, textUnderlineOffset: "4px" }}>
            Review services &amp; pricing
          </Link>
        </Box>
      </PageContainer>
    </Box>
  );
}
