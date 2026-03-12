import Box from "@mui/material/Box";

export default function TextBlock({ children }) {
  return (
    <Box
      component="pre"
      sx={{
        background: "#FFDBE9",
        padding: "1rem",
        borderRadius: "8px",
        whiteSpace: "pre-wrap",
        fontSize: "1.1rem",
        lineHeight: 1.6,
        marginTop: "1rem"
      }}
    >
      {children}
    </Box>
  );
}