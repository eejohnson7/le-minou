import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

export default function ShellHeader({ ariaLabel, links = [] }) {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "var(--paper)",
        borderBottom: "1px solid var(--plum-line-soft)"
      }}
    >
      <PageContainer>
        <Box
          component="nav"
          aria-label={ariaLabel}
          sx={{
            minHeight: { xs: 64, sm: 68 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            aria-label="Le Minou home"
            sx={{ color: "var(--plum)", textDecoration: "none", flexShrink: 0 }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: { xs: "1.55rem", sm: "1.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.035em"
              }}
            >
              Le Minou
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 2.25 }
            }}
          >
            {links.map((link) => (
              <Box
                key={`${link.to}-${link.label}`}
                component={RouterLink}
                to={link.to}
                sx={{
                  color: "var(--muted-ink)",
                  fontSize: { xs: "0.82rem", sm: "0.9rem" },
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": { color: "var(--plum)" }
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
}
