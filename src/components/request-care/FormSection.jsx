import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function FormSection({ number, title, description, children, id }) {
  return (
    <Box component="section" aria-labelledby={id} sx={{ borderTop: "1px solid var(--plum-line)", pt: { xs: 3.5, sm: 4.5 } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "2.5rem minmax(0, 1fr)", gap: { xs: 1, sm: 1.75 }, mb: { xs: 3, sm: 3.5 } }}>
        <Typography aria-hidden="true" sx={{ color: "var(--plum)", fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 700, pt: 0.45 }}>
          {number}
        </Typography>
        <Box>
          <Typography id={id} component="h3" variant="h3" sx={{ color: "var(--ink)", fontSize: { xs: "1.55rem", sm: "1.8rem" }, lineHeight: 1.15 }}>
            {title}
          </Typography>
          {description && (
            <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.9rem", lineHeight: 1.65, mt: 0.75 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      {children}
    </Box>
  );
}
