import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const publicLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Services & Pricing", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Request Care", to: "/request-care", primary: true },
  { label: "Client Login", to: "/sign-in", client: true }
];

const navLinkStyles = ({ client = false, primary = false }) => ({
  position: "relative",
  color: primary ? "var(--paper)" : client ? "var(--muted-ink)" : "var(--ink)",
  fontSize: client ? "0.82rem" : "0.91rem",
  fontWeight: 700,
  lineHeight: 1.2,
  textDecoration: "none",
  transition: "color 160ms ease",
  ...(primary && {
    bgcolor: "var(--plum)",
    borderRadius: "8px",
    px: 1.45,
    py: 1
  }),
  "&::after": client || primary
    ? undefined
    : {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -7,
        height: "1px",
        bgcolor: "var(--plum)",
        transform: "scaleX(0)",
        transformOrigin: "right",
        transition: "transform 160ms ease"
      },
  "&:hover": {
    color: primary ? "var(--paper)" : "var(--plum)",
    ...(primary && { bgcolor: "var(--plum-hover)" })
  },
  "&:hover::after, &.active::after": {
    transform: "scaleX(1)",
    transformOrigin: "left"
  }
});

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 250, 246, 0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--plum-line-soft)",
          color: "var(--ink)"
        }}
      >
        <Toolbar
          disableGutters
          sx={(theme) => ({
            width: `min(${theme.brand.layout.maxWidth}px, calc(100% - 2.5rem))`,
            minHeight: { xs: 68, md: 78 },
            mx: "auto",
            display: "flex",
            justifyContent: "space-between"
          })}
        >
          <Box
            component={NavLink}
            to="/"
            aria-label="Le Minou home"
            onClick={closeMobileNav}
            sx={{ display: "inline-flex", alignItems: "baseline", gap: 1, color: "var(--plum)", textDecoration: "none" }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: { xs: "1.8rem", sm: "2.05rem" },
                fontWeight: 700,
                letterSpacing: "-0.035em"
              }}
            >
              Le Minou
            </Typography>
            <Typography
              component="span"
              className="handwritten-accent"
              aria-hidden="true"
              sx={{ display: { xs: "none", sm: "inline" }, fontSize: "0.9rem", transform: "rotate(-3deg)" }}
            >
              pet care
            </Typography>
          </Box>

          <Box component="nav" aria-label="Primary navigation" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2.5 }}>
            {publicLinks.map((item) => (
              <Box
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.end}
                sx={navLinkStyles(item)}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "var(--plum)" }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileNav}
        slotProps={{
          paper: {
            sx: {
              width: "min(88vw, 360px)",
              bgcolor: "var(--cream)",
              borderLeft: "1px solid var(--plum-line)",
              boxShadow: "none",
              p: 2.5
            }
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
          <Typography sx={{ color: "var(--plum)", fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700 }}>
            Le Minou
          </Typography>
          <IconButton onClick={closeMobileNav} aria-label="Close navigation menu" sx={{ color: "var(--plum)" }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box component="nav" aria-label="Mobile navigation" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          {publicLinks.map((item) => (
            <Box
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.end}
              onClick={closeMobileNav}
              sx={{
                width: "100%",
                color: item.primary ? "var(--paper)" : item.client ? "var(--muted-ink)" : "var(--ink)",
                bgcolor: item.primary ? "var(--plum)" : "transparent",
                borderTop: item.primary ? 0 : "1px solid var(--plum-line-soft)",
                borderRadius: item.primary ? "8px" : 0,
                px: item.primary ? 1.5 : 0,
                py: item.primary ? 1.5 : 1.8,
                mt: item.primary ? 1.5 : 0,
                fontFamily: item.client || item.primary ? "var(--font-body)" : "var(--font-display)",
                fontSize: item.client || item.primary ? "1rem" : "1.55rem",
                fontWeight: 700,
                textDecoration: "none",
                "&.active": { color: item.primary ? "var(--paper)" : "var(--plum)" }
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
