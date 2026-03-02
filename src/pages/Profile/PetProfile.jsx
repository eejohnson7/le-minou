import { Box, Typography, Button, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { usePet } from "../../hooks/usePet";
import PetPhoto from "../../components/Profile/PetProfile/PetPhoto";
import IdentitySection from "../../components/Profile/PetProfile/IdentitySection";
import FeedingSection from "../../components/Profile/PetProfile/FeedingSection";
import BathroomSection from "../../components/Profile/PetProfile/BathroomSection";
import HealthSection from "../../components/Profile/PetProfile/HealthSection";
import BehaviorSection from "../../components/Profile/PetProfile/BehaviorSection";
import HomeSection from "../../components/Profile/PetProfile/HomeSection";
import NotesSection from "../../components/Profile/PetProfile/NotesSection";
import VetInfoCard from "../../components/Profile/PetProfile/VetSection";

export default function PetProfile() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { pet, loading } = usePet(petId);

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem", color: "#980061" }}>
        Loading pet…
      </Typography>
    );
  }

  if (!pet) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem", color: "#980061" }}>
        Pet not found.
      </Typography>
    );
  } else {
    console.log("Pet data:", pet);
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "4rem auto", padding: "0 2rem", color: "#980061" }}>
      <Box
        sx={{
          display: "flex",
          gap: "3rem",
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        {/* Left: Photo */}
        <PetPhoto pet={pet} />

        {/* Middle: Identity */}
        <Box sx={{ minWidth: "250px" }}>
          <IdentitySection pet={pet} />
        </Box>

        {/* Right: Vet Info Card */}
        <VetInfoCard pet={pet} />
      </Box>

      <Divider sx={{ borderColor: "#980061", margin: "2rem 0" }} />

      <Typography
        sx={{
          fontSize: "2.5rem",
          color: "#980061",
        }}
      >
        Feeding & Water
      </Typography>
      <FeedingSection pet={pet} />

      <Typography
        sx={{
          fontSize: "2.5rem",
          letterSpacing: "0.2px",
          color: "#980061",
          mb: 1.5,
        }}
      >
        Bathroom Routine
      </Typography>
      <BathroomSection pet={pet} />

      <Typography
        sx={{
          fontSize: "2.5rem",
          letterSpacing: "0.2px",
          color: "#980061",
          mb: 1.5,
        }}
      >
        Health & Medical
      </Typography>
      <HealthSection pet={pet} />

      <Typography
        sx={{
          fontSize: "2.5rem",
          letterSpacing: "0.2px",
          color: "#980061",
          mb: 1.5,
        }}
      >
        Behavior & Personality
      </Typography>
      <BehaviorSection pet={pet} />

      <Typography
        sx={{
          fontSize: "2.5rem",
          letterSpacing: "0.2px",
          color: "#980061",
          mb: 1.5,
        }}
      >
        Home Environment
      </Typography>
        <HomeSection pet={pet} />

        <Typography
          sx={{
            fontSize: "2.5rem",
            letterSpacing: "0.2px",
            color: "#980061",
            mb: 1.5,
          }}
        >
          Notes
        </Typography>
      <NotesSection pet={pet} />

      <Button
        variant="plum-contained"
        onClick={() => navigate(`/pet/${petId}/edit`)}
      >
        Edit Pet Profile
      </Button>
    </Box>
  );
}