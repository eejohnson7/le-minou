import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AuthCard({ eyebrow, title, description, children, busy = false }) {
  return (
    <Box
      sx={{
        width: "min(calc(100% - 2rem), 480px)",
        my: { xs: 3, sm: 5.5 },
        mx: "auto"
      }}
    >
      <Box
        component="section"
        aria-busy={busy}
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "var(--paper)",
          border: "1px solid var(--plum-line)",
          borderRadius: "8px",
          px: { xs: 2.75, sm: 4.5 },
          py: { xs: 3.25, sm: 4.5 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "0 0 auto",
            height: "4px",
            bgcolor: "var(--blush)"
          }
        }}
      >
        <Typography
          component="p"
          sx={{
            color: "var(--plum)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.13em",
            lineHeight: 1.4,
            textTransform: "uppercase",
            mb: 1.25
          }}
        >
          {eyebrow}
        </Typography>

        <Typography
          component="h1"
          variant="h2"
          sx={{
            color: "var(--ink)",
            fontSize: { xs: "2.2rem", sm: "2.65rem" },
            lineHeight: 1.05
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{
              color: "var(--muted-ink)",
              fontSize: "0.96rem",
              lineHeight: 1.7,
              mt: 1.5
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ mt: 3.25 }}>{children}</Box>
      </Box>
    </Box>
  );
}
