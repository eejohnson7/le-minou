import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EditorialImageSlot({
  children,
  footerLabel,
  mediaSx = {},
  sx = {}
}) {
  return (
    <Box
      component="figure"
      sx={{
        position: "relative",
        m: 0,
        pb: { xs: 3, sm: 3.5 },
        ...sx
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: { xs: "1.25rem -0.75rem 1rem 1.1rem", sm: "1.75rem -1rem 1rem 1.75rem" },
          border: "1px solid var(--plum-line)",
          bgcolor: "var(--paper)"
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          aspectRatio: { xs: "16 / 10", md: "4 / 5" },
          overflow: "hidden",
          bgcolor: "var(--soft-pink)",
          border: "1px solid var(--plum-line)",
          ...mediaSx
        }}
      >
        {children}

        {footerLabel && (
          <Box
            sx={{
              position: "absolute",
              left: { xs: 18, sm: 26 },
              bottom: { xs: 18, sm: 25 },
              width: { xs: 145, sm: 170 },
              borderTop: "1px solid var(--plum)",
              pt: 0.9
            }}
          >
            <Typography
              sx={{
                color: "var(--plum)",
                fontSize: "0.69rem",
                fontWeight: 700,
                letterSpacing: "0.11em",
                textTransform: "uppercase"
              }}
            >
              {footerLabel}
            </Typography>
          </Box>
        )}
      </Box>

    </Box>
  );
}
