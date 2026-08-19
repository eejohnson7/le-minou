import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const toneStyles = {
  error: {
    border: "rgba(165, 35, 69, 0.32)",
    background: "rgba(255, 236, 242, 0.68)",
    accent: "#a52345"
  },
  success: {
    border: "rgba(66, 108, 76, 0.32)",
    background: "rgba(239, 246, 237, 0.78)",
    accent: "#426c4c"
  },
  neutral: {
    border: "var(--plum-line)",
    background: "var(--cream)",
    accent: "var(--plum)"
  }
};

export default function AuthStatus({ children, id, title, tone = "error" }) {
  const styles = toneStyles[tone] ?? toneStyles.error;

  return (
    <Box
      id={id}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      sx={{
        border: `1px solid ${styles.border}`,
        borderLeft: `3px solid ${styles.accent}`,
        bgcolor: styles.background,
        px: 2,
        py: 1.5
      }}
    >
      {title && (
        <Typography sx={{ color: "var(--ink)", fontWeight: 700, lineHeight: 1.45, mb: 0.35 }}>
          {title}
        </Typography>
      )}
      <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.88rem", lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Box>
  );
}
