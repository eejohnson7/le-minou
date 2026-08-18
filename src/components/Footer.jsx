import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import PageContainer from "./layout/PageContainer";

const footerLinks = [
  { label: "Services & Pricing", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Request Care", to: "/request-care" },
  { label: "Client Login", to: "/sign-in" }
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "var(--deep-plum)", color: "var(--paper)", pt: { xs: 6, md: 8 }, pb: 3 }}>
      <PageContainer>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.25fr 0.75fr" },
            gap: { xs: 5, md: 8 },
            pb: 6
          }}
        >
          <Box sx={{ maxWidth: 520 }}>
            <Typography component="p" sx={{ fontFamily: "var(--font-display)", fontSize: { xs: "2.2rem", md: "2.75rem" }, fontWeight: 700, lineHeight: 1 }}>
              Le Minou
            </Typography>
            <Typography sx={{ color: "rgba(255, 253, 251, 0.7)", fontSize: "0.98rem", lineHeight: 1.7, mt: 2 }}>
              Owner-operated cat care, dog walking, and thoughtful in-home pet care on Chicago&apos;s North Side.
            </Typography>
          </Box>

          <Box component="nav" aria-label="Footer navigation" sx={{ display: "grid", alignContent: "start", gap: 1.25 }}>
            {footerLinks.map((link) => (
              <Box
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{
                  width: "fit-content",
                  color: "rgba(255, 253, 251, 0.78)",
                  fontSize: "0.94rem",
                  textDecoration: "none",
                  "&:hover": { color: "var(--paper)" }
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1, pt: 2.5, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <Typography sx={{ color: "rgba(255, 253, 251, 0.52)", fontSize: "0.78rem" }}>
            © {new Date().getFullYear()} Le Minou
          </Typography>
          <Typography sx={{ color: "rgba(255, 253, 251, 0.52)", fontSize: "0.78rem" }}>
            Chicago, Illinois
          </Typography>
        </Box>
      </PageContainer>
    </Box>
  );
}
