import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useUserPets } from "../../hooks/useUserPets";
import { useBooking } from "../../context/BookingContext";
import ServiceOptionCard from "../../components/Book/ServiceOptionCard";

export default function Service() {
  const navigate = useNavigate();

  const { user: authUser, loading: loadingUser } = useAuthUser();
  const { pets: fetchedPets = [], loading: loadingPets } = useUserPets(authUser?.id);

  const {
    pets: selectedPets,
    service,
    setService
  } = useBooking();

  if (loadingUser || loadingPets) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem" }}>
        Loading your services…
      </Typography>
    );
  }

  if (!authUser) return null;

  // 🐾 Only show Dog Walk if selected pets include a dog
  const selectedDog = fetchedPets.some(
    (pet) =>
      selectedPets.includes(pet.id) &&
      pet.species?.toLowerCase() === "dog"
  );

  const handleSelectService = (service) => {
    setService((prev) => (prev === service ? null : service));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 4 }}>
      <Typography sx={{ mb: 3, fontSize: "3rem" }}>
        Choose your service
      </Typography>

      {/* Always available */}
      <ServiceOptionCard
        title="Drop-In Visit(s)"
        description="A gentle, attentive visit for feeding, litter, and companionship."
        selected={service === "drop-in"}
        onSelect={() => handleSelectService("drop-in")}
      />

      {/* Only show if selected pets include a dog */}
      {selectedDog && (
        <ServiceOptionCard
          title="Dog Walk"
          description="A calm, structured walk tailored to your dog’s needs."
          selected={service === "dog-walk"}
          onSelect={() => handleSelectService("dog-walk")}
        />
      )}

      {/* Continue button */}
      <Button
        variant={service ? "plum-contained" : "plum-outlined"}
        disabled={!service}
        onClick={() => navigate("/book/duration")}
        sx={{ mt: 4, width: "100%", borderRadius: 2, py: 1.5, fontSize: "1.75rem" }}
      >
        Continue
      </Button>
    </Box>
  );
}