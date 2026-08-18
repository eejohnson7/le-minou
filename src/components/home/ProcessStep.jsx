import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProcessStep({ number, title, children }) {
  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: { xs: "3.4rem minmax(0, 1fr)", sm: "4.75rem minmax(0, 1fr)" },
        gap: { xs: 1.5, sm: 2.5 },
        borderTop: "1px solid rgba(255, 255, 255, 0.16)",
        py: { xs: 3, md: 3.5 }
      }}
    >
      <Typography
        component="p"
        sx={{
          color: "var(--petal)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.8rem", sm: "2.4rem" },
          fontWeight: 700,
          lineHeight: 1,
          opacity: 0.58
        }}
      >
        {number}
      </Typography>
      <Box sx={{ display: { sm: "grid" }, gridTemplateColumns: { sm: "minmax(180px, 0.8fr) minmax(0, 1.2fr)" }, gap: { sm: 3 }, alignItems: "baseline" }}>
        <Typography
          component="h3"
          variant="h3"
          sx={{ color: "var(--paper)", fontSize: { xs: "1.5rem", sm: "1.75rem" }, mb: { xs: 0.75, sm: 0 } }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "rgba(255, 253, 251, 0.7)", fontSize: "0.94rem", lineHeight: 1.65, maxWidth: 380 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
