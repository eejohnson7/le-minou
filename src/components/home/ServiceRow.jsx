import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function ServiceRow({ number, title, description, prices }) {
  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "3rem minmax(0, 1fr)",
          md: "5rem minmax(0, 1.25fr) minmax(220px, 0.6fr)"
        },
        columnGap: { xs: 1.5, md: 3 },
        rowGap: { xs: 2.5, md: 2 },
        alignItems: "start",
        py: { xs: 3.5, md: 4.5 },
        borderTop: "1px solid var(--plum-line)"
      }}
    >
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontFamily: "monospace",
          fontSize: "0.78rem",
          fontWeight: 700,
          pt: 0.7
        }}
      >
        {number}
      </Typography>

      <Box>
        <Typography
          component="h3"
          variant="h3"
          sx={{
            color: "var(--ink)",
            fontSize: { xs: "1.65rem", sm: "2rem", md: "2.35rem" },
            lineHeight: 1.1,
            mb: 1.25
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "var(--muted-ink)",
            fontSize: { xs: "0.98rem", md: "1.05rem" },
            lineHeight: 1.7,
            maxWidth: 600
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box sx={{ gridColumn: { xs: "2", md: "auto" } }}>
        <Box sx={{ display: "grid", gap: 0.65, mb: 2 }}>
          {prices.map((price) => (
            <Box
              key={`${price.label}-${price.value}`}
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.86rem" }}>
                {price.label}
              </Typography>
              <Typography sx={{ color: "var(--ink)", fontSize: "0.88rem", fontWeight: 700 }}>
                {price.value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Link
          component={RouterLink}
          to="/services"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: "var(--plum)",
            fontSize: "0.9rem",
            fontWeight: 700,
            "& svg": { transition: "transform 160ms ease" },
            "&:hover svg": { transform: "translate(3px, -3px)" }
          }}
        >
          View details <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
        </Link>
      </Box>
    </Box>
  );
}

