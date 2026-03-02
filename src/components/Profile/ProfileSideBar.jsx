import { Box, Typography, Button } from "@mui/material";
import ProfilePhoto from "./ProfilePhoto";
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
          variant="plum-contained"
          size="large"
          onClick={onEdit}
        >
          Edit Profile
        </Button>

        <Button
          variant="plum-contained"
          size="large"
          onClick={onLogout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
}