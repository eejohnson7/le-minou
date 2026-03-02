import { Box, Typography, Button } from "@mui/material";
import ProfilePhoto from "./ProfilePhoto";
import { plumButton } from "../../styles/buttonStyles";
import { supabase } from "../../utils/supabase";

export default function ProfileSidebar({ user, profile, onEdit, onLogout }) {
  const handleAvatarUpload = async (file) => {
    if (!file) return;

    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const ext = file.name.split(".").pop();
    const filePath = `${authUser.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const { error: updateError } = await supabase
      .from("user")
      .update({ photo_path: filePath })
      .eq("id", authUser.id);

    if (updateError) {
      console.error(updateError);
      return;
    }

    // No reload. No refreshSession. Your profile hook will pick up the new path.
  };

  return (
    <Box
      sx={{
        width: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        gap: "1.5rem"
      }}
    >
      <ProfilePhoto
        currentUrl={profile?.signed_photo_url}
        onChange={handleAvatarUpload}
      />

      <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, textAlign: "center" }}>
        {profile?.first_name} {profile?.last_name}
      </Typography>

      <Typography sx={{ fontSize: "1.25rem", opacity: 0.8, textAlign: "center" }}>
        {user.email}
      </Typography>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={onEdit}
          sx={{ ...plumButton(true), width: "100%" }}
        >
          Edit Profile
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={onLogout}
          sx={{ ...plumButton(true), width: "100%" }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
}