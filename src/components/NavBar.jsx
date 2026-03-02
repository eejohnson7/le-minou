import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { useProfile } from "../hooks/useProfile";

function NavBar() {
  const { user, loading: authLoading } = useAuthUser();
  const { profile, loading: profileLoading } = useProfile(user?.id);

  const isSignedIn = !!user;
  const isLoadingProfile = authLoading || profileLoading;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 2rem"
        }}
      >
        <Typography
          component="a"
          href="/"
          sx={{
            textDecoration: "none",
            color: "#980061",
            fontSize: "3rem",
            fontWeight: 500,
            "&:hover": { opacity: 0.8 }
          }}
        >
          Le Minou
        </Typography>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Typography component="a" href="/about" sx={{ textDecoration: "none", color: "#980061", fontSize: "1.25rem", fontWeight: 500, "&:hover": { opacity: 0.8 } }}>
            About
          </Typography>

          <Typography component="a" href="/services" sx={{ textDecoration: "none", color: "#980061", fontSize: "1.25rem", fontWeight: 500, cursor: "pointer", "&:hover": { opacity: 0.8 } }}>
            Services
          </Typography>

          <Typography component="a" href="/photo-library" sx={{ textDecoration: "none", color: "#980061", fontSize: "1.25rem", fontWeight: 500, cursor: "pointer", "&:hover": { opacity: 0.8 } }}>
            Photo Library
          </Typography>

          {isSignedIn ? (
            <Avatar
              src={profile?.signed_photo_url || logo}
              alt={user.email}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "2px solid #980061",
                cursor: "pointer",
                objectFit: "cover",
                "&:hover": { opacity: 0.8 }
              }}
              component="a"
              href="/profile"
            />
          ) : (
            // Show Sign In even while loading
            <Typography
              component="a"
              href="/sign-in"
              sx={{
                textDecoration: "none",
                color: "#980061",
                fontSize: "1.25rem",
                fontWeight: 500,
                "&:hover": { opacity: 0.8 }
              }}
            >
              Sign In
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;