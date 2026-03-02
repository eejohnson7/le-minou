import { Box, Typography } from "@mui/material";

export default function VetInfoCard({ pet }) {
  return (
    <Box
      sx={{
        minWidth: "260px",
        border: "2px solid #980061",
        borderRadius: "12px",
        padding: "1.25rem",
        backgroundColor: "#FFDBE9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        color: "#980061",

        // NEW: center everything
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <Typography sx={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
        Veterinarian
      </Typography>

      {pet.vet.vet_name || pet.vet.vet_phone || pet.vet.vet_address ? (
        <Typography
          sx={{
            opacity: 0.85,
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
            fontSize: "1.25rem"
          }}
        >
          {pet.vet.vet_name && `${pet.vet.vet_name}\n`}
          {pet.vet.clinic_name && `${pet.vet.clinic_name}\n`}
          {pet.vet.phone && `${pet.vet.phone}\n`}
          {pet.vet.street_line_1 && `${pet.vet.street_line_1}`}
        </Typography>
      ) : (
        <Typography sx={{ opacity: 0.6 }}>
          No veterinarian information added yet.
        </Typography>
      )}
    </Box>
  );
}