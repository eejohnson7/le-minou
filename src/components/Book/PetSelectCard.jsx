import { Box, Typography } from "@mui/material";

export default function PetCard({ pet, selected, onSelect }) {
  return (
    <Box
    onClick={onSelect}
    sx={{
        borderRadius: 2,
        border: "2px solid",
        borderColor: selected ? "#980061" : "#980061",
        backgroundColor: selected ? "#FFDBE9" : "#FFF5F6",
        cursor: "pointer",
        p: 2,
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        "&:hover": {
        backgroundColor: selected ? "#FFDBE9" : "rgba(152, 0, 97, 0.06)"
        },
    }}
    >
      <Box
        component="img"
        src={pet.photo_url || logo}
        alt={pet.name}
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <Box>
        <Typography sx={{ fontSize: "2rem" }}>{pet.name}</Typography>
        {pet.breed && (
          <Typography sx={{ color: "text.secondary", fontSize: "1.25rem" }}>
            {pet.species} - {pet.breed}
          </Typography>
        )}
      </Box>
    </Box>
  );
}