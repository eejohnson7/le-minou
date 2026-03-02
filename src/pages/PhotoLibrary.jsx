import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function PhotoLibrary() {
  const photos = [
    {
      id: 1,
      url: "/images/ivy.jpeg",
      title: "Ivy — February 2026"
    }
  ];

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "0 2rem",
        color: "#980061"
      }}
    >

      <Typography
        variant="h2"
        sx={{
          fontSize: "2.5rem",
          marginBottom: "3rem",
          textAlign: "center"
        }}
      >
        Photo Library
      </Typography>

      <Grid container spacing={4}>
        {photos.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box>
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  display: "block",
                  objectFit: "cover"
                }}
              />
              <Typography
                sx={{
                  marginTop: "0.75rem",
                  fontSize: "0.95rem",
                  color: "#5a003c",
                  textAlign: "center"
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PhotoLibrary;