import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function SectionEyebrow({ children, light = false, sx = {}, ...props }) {
  return (
    <Typography
      component="p"
      {...props}
      sx={{
        color: light ? "var(--petal)" : "var(--plum)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        lineHeight: 1.5,
        textTransform: "uppercase",
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  light = false,
  maxWidth = 680,
  sx = {}
}) {
  return (
    <Box sx={{ maxWidth, mb: { xs: 4, md: 6 }, ...sx }}>
      {eyebrow && (
        <SectionEyebrow light={light} sx={{ mb: 1.25 }}>
          {eyebrow}
        </SectionEyebrow>
      )}
      <Typography
        id={id}
        component="h2"
        variant="h2"
        sx={{
          color: light ? "var(--paper)" : "var(--ink)",
          fontSize: { xs: "2.25rem", sm: "2.8rem", md: "3.35rem" },
          lineHeight: 1.03,
          mb: description ? 1.75 : 0
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: light ? "rgba(255, 253, 251, 0.72)" : "var(--muted-ink)",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.75
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

