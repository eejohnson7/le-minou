import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { calculateAge } from "../../utils/calculateAge";

export default function PetCard({ pet }) {
  const age = calculateAge(pet.birthdate);

  return (
    <Link
      to={`/pet/${pet.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          backgroundColor: "#FFDBE9",
          padding: "1.5rem",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "0.25s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            transform: "translateY(-2px)"
          }
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          <img
            src={pet.photo_url || logo}
            alt={pet.name}
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #980061",
              marginBottom: "0.75rem"
            }}
          />

          <Typography sx={{ fontSize: "1.6rem", color: "#980061", fontWeight: 600 }}>
            {pet.name}
          </Typography>

          <Typography sx={{ opacity: 0.8, marginTop: "0.4rem", fontSize: "1.15rem" }}>
            {pet.species} {pet.breed && `- ${pet.breed}`}
          </Typography>

          {age && (
            <Typography sx={{ opacity: 0.8, marginTop: "0.25rem", fontSize: "1.15rem" }}>
              Age: {age}
            </Typography>
          )}
        </CardContent>

        <CardActions />
      </Card>
    </Link>
  );
}