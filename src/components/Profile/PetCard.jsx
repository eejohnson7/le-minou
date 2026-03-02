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
          border: "1px solid #980061",
          borderRadius: "12px",
          backgroundColor: "rgba(152, 0, 97, 0.03)",
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "0.2s",
          "&:hover": {
            boxShadow: "0 0 0 2px #980061 inset",
            transform: "translateY(-2px)"
          }
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          <img
            src={pet.photo_url || logo}
            alt={pet.name}
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #980061",
              marginBottom: "0.5rem"
            }}
          />

          <Typography sx={{ fontSize: "1.75rem", color: "#980061" }}>
            {pet.name}
          </Typography>

          <Typography sx={{ opacity: 0.8, marginTop: "0.5rem", fontSize: "1.25rem" }}>
            {pet.species} {pet.breed && `- ${pet.breed}`}
          </Typography>

          {age && (
            <Typography sx={{ opacity: 0.8, marginTop: "0.25rem", fontSize: "1.25rem" }}>
              Age: {age}
            </Typography>
          )}
        </CardContent>

        <CardActions />
      </Card>
    </Link>
  );
}