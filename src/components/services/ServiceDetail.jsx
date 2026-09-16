import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ServiceDetail({ service, index = 0 }) {
  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "3.25rem minmax(0, 1fr)",
          md: "5.5rem minmax(0, 1.2fr) minmax(240px, 0.58fr)"
        },
        columnGap: { xs: 1.5, md: 3.5 },
        rowGap: { xs: 3, md: 4 },
        alignItems: "start",
        borderTop: "1px solid var(--plum-line)",
        py: { xs: 4.5, sm: 5.5, md: 7 },
        ml: { md: index % 2 === 1 ? 7 : 0 },
        mr: { md: index % 2 === 0 ? 7 : 0 }
      }}
    >
      <Typography
        aria-hidden="true"
        sx={{
          color: "var(--plum)",
          fontFamily: "monospace",
          fontSize: { xs: "0.78rem", md: "0.84rem" },
          fontWeight: 700,
          letterSpacing: "0.08em",
          pt: { xs: 0.6, md: 1.15 }
        }}
      >
        {service.number}
      </Typography>

      <Box>
        <Typography
          component="h3"
          variant="h2"
          sx={{
            color: "var(--ink)",
            fontSize: { xs: "2.2rem", sm: "2.75rem", md: "3.65rem" },
            lineHeight: 0.98,
            maxWidth: 610,
            mb: 2
          }}
        >
          {service.title}
        </Typography>
        <Typography
          sx={{
            color: "var(--muted-ink)",
            fontSize: { xs: "1rem", md: "1.08rem" },
            lineHeight: 1.75,
            maxWidth: 590
          }}
        >
          {service.description}
        </Typography>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: "2", md: "auto" },
          borderLeft: { md: "1px solid var(--plum-line)" },
          pl: { md: 3.5 }
        }}
      >
        <Box sx={{ display: "grid" }}>
          {service.prices.map(({ label, service: priceSource }) => (
            <Box
              key={priceSource?.label ?? label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 2,
                borderTop: "1px solid var(--plum-line-soft)",
                py: 1.15
              }}
            >
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.86rem" }}>
                {label}
              </Typography>
              <Typography sx={{ color: "var(--ink)", fontSize: "0.9rem", fontWeight: 700, textAlign: "right" }}>
                {priceSource?.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
