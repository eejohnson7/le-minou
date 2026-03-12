import { useNavigate } from "react-router-dom";
import { useUserPets } from "../../hooks/useUserPets";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useProfile } from "../../hooks/useProfile";
import { useBooking } from "../../context/BookingContext";
import PetSelectCard from "../../components/Service/PetSelectCard";
import { Box, Button, Typography } from "@mui/material";

export default function PetSelection() {
  const navigate = useNavigate();

  // Auth + profile
  const { user: authUser, loading: loadingUser } = useAuthUser();
  const { profile, loading: loadingProfile } = useProfile(authUser?.id);

  // Fetched pets from Supabase
  const { pets: fetchedPets = [], loading: loadingPets } = useUserPets(authUser?.id);

  // Selected pets from booking context
  const { pets: selectedPets, setPets: setSelectedPets } = useBooking();

  // Loading guard
  if (loadingUser || loadingProfile || loadingPets) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem" }}>
        Loading your profile…
      </Typography>
    );
  }

  if (!authUser) return null;

  // Toggle selection
  const togglePet = (petId) => {
    const alreadySelected = selectedPets.includes(petId);

    setSelectedPets(
      alreadySelected
        ? selectedPets.filter((id) => id !== petId)
        : [...selectedPets, petId]
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 4 }}>
      <Typography sx={{ mb: 3, fontSize: "3rem"}}>
        Who is this visit for?
      </Typography>

      {/* Empty state */}
      {fetchedPets.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography sx={{ mb: 2, fontSize: "2.25rem" }}>
            You haven’t added any pets yet.
          </Typography>

          <Button
            variant="plum-contained"
            onClick={() => navigate("/add-pet")}
          >
            Add a Pet
          </Button>
        </Box>
      )}

      {/* Pet list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fetchedPets.map((pet) => (
          <PetSelectCard
            key={pet.id}
            pet={pet}
            selected={selectedPets.includes(pet.id)}
            onSelect={() => togglePet(pet.id)}
          />
        ))}
      </Box>

      {/* Continue button */}
      {fetchedPets.length > 0 && (
        <Button
        variant={selectedPets.length === 0 ? "plum-outlined" : "plum-contained"}
        disabled={selectedPets.length === 0}
        onClick={() => navigate("/book/service")}
        sx={{ mt: 4, width: "100%", py: 1.5, fontSize: "1.75rem" }}
        >
        Continue
        </Button>
      )}
    </Box>
  );
}