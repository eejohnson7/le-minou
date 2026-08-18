import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PhotoLibrary() {
  return (
    <Box component="main" sx={{ py: 4, px: 2 }}>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          fontSize: "3rem",
          marginBottom: "3rem",
          textAlign: "center"
        }}
      >
        Photo Library
      </Typography>
    </Box>
  );
}

export default PhotoLibrary;
