import { Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useProfile } from "../../hooks/useProfile";
import { useUserPets } from "../../hooks/useUserPets";
import { useLogout } from "../../hooks/auth/useLogout";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import PetCard from "../../components/Profile/PetCard";

export default function Profile() {
  const navigate = useNavigate();

  const { user: authUser, loading: loadingUser } = useAuthUser();

  const { profile, loading: loadingProfile } = useProfile(authUser?.id);
  const { pets, loading: loadingPets } = useUserPets(authUser?.id);
  const logout = useLogout();

  useEffect(() => {
    if (!loadingUser && !authUser) {
      navigate("/sign-in");
    }
  }, [loadingUser, authUser, navigate]);

  if (loadingUser || loadingProfile) {
    return (
      <Typography sx={{ textAlign: "center", mt: "4rem" }}>
        Loading your profile…
      </Typography>
    );
  }

  if (!authUser) return null;

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        margin: "4rem auto",
        padding: "0 2rem",
        color: "#980061",
        display: "flex",
        gap: "3rem"
      }}
    >
      {/* Left Sidebar */}
      <ProfileSidebar
        user={authUser}
        profile={profile}
        onEdit={() => navigate("/edit-profile")}
        onLogout={logout}
      />

      {/* Right Column */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{ fontSize: "2.5rem", marginBottom: "2rem" }}
        >
          Your Profile
        </Typography>

        <Divider sx={{ borderColor: "#980061", marginBottom: "2rem" }} />

        {/* Pets Section */}
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Your Pets
          </Typography>

          {loadingPets ? (
            <Typography sx={{ opacity: 0.7 }}>Loading pets…</Typography>
          ) : pets.length === 0 ? (
            <Typography sx={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "1rem" }}>
              You haven’t added any pets yet.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(auto-fill, minmax(240px, 1fr))",
                  sm: "repeat(auto-fill, minmax(260px, 1fr))"
                },
                gap: "1rem",
                marginBottom: "1rem"
              }}
            >
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </Box>
          )}

          <Button
            variant="plum-contained"
            onClick={() => navigate("/add-pet")}
          >
            Add Pet
          </Button>
        </Box>

        <Divider sx={{ borderColor: "#980061", marginBottom: "2rem" }} />

        {/* Bookings Section */}
        <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Upcoming Bookings
        </Typography>

        <Typography sx={{ fontSize: "1.25rem", opacity: 0.7, marginBottom: "1rem" }}>
          You don’t have any upcoming bookings yet.
        </Typography>

        <Button
          variant="plum-contained"
          onClick={() => navigate("/book-service")}
        >
          Add New Booking
        </Button>
      </Box>
    </Box>
  );
}