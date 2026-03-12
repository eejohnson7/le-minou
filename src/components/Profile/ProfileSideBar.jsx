import { Box, Typography, Button } from "@mui/material";
import HoverEditableField from "./HoverEditableField";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAvatarUpload } from "../../hooks/useAvatarUpload";
import PhotoUploader from "./PhotoUploader"

export default function ProfileSidebar({ user, profile, onLogout }) {
  const safe = (v) => v ?? "";

  const uploadAvatar = useAvatarUpload();

  const { form, handleChange, save } = useEditableSection({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    street_line_1: profile?.street_line_1 || "",
    street_line_2: profile?.street_line_2 || "",
    city: profile?.city || "",
    state: profile?.state || "",
    postal_code: profile?.postal_code || ""
  });

  const commit = (field) => async (value) => {
    handleChange(field)({ target: { value } });
    await save(user.id);
  };

  return (
    <Box
      sx={{
        width: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: "2rem",
        pb: "2rem",
        px: "1rem",
        borderRadius: "16px",
        backgroundColor: "#FFDBE9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        gap: "1.5rem"
      }}
    >
      {/* Identity Block */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%"
        }}
      >
        <PhotoUploader
          src={profile?.signed_photo_url}
          onChange={uploadAvatar}
          shape="circle"
          size={140}
        />

        {/* Name */}
        <Box sx={{ fontSize: "1.75rem", width: "100%" }}>
          <HoverEditableField
            fields={[
              {
                label: "First Name",
                value: form.first_name,
                onSave: (v) => commit("first_name")(v),
                width: "140px"
              },
              {
                label: "Last Name",
                value: form.last_name,
                onSave: (v) => commit("last_name")(v),
                width: "140px"
              }
            ]}
            renderDisplay={([first, last]) => `${first} ${last}`}
          />
        </Box>

        {/* Email + Phone */}
        <Box
          sx={{
            opacity: 0.8,
            fontSize: "1.1rem",
            lineHeight: 1.4,
            width: "100%"
          }}
        >
          <Typography sx={{ fontSize: "1.25rem", opacity: 0.9 }}>
            {user.email}
          </Typography>

          <Box sx={{ width: "100%" }}>
            <HoverEditableField
              value={form.phone}
              onSave={commit("phone")}
            />
          </Box>
        </Box>

        {/* Address */}
        <Box
          sx={{
            opacity: 0.8,
            fontSize: "1.25rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem"
          }}
        >
          <Box sx={{ width: "100%" }}>
            <HoverEditableField
              value={safe(form.street_line_1)}
              onSave={(v) => commit("street_line_1")(v)}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <HoverEditableField
              value={safe(form.street_line_2)}
              onSave={(v) => commit("street_line_2")(v)}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <HoverEditableField
              fields={[
                {
                  label: "City",
                  value: safe(form.city),
                  onSave: (v) => commit("city")(v),
                  width: "120px"
                },
                {
                  label: "State",
                  value: safe(form.state),
                  onSave: (v) => commit("state")(v),
                  width: "60px"
                },
                {
                  label: "ZIP",
                  value: safe(form.postal_code),
                  onSave: (v) => commit("postal_code")(v),
                  width: "80px"
                }
              ]}
              renderDisplay={([city, state, zip]) =>
                `${city}${state ? ", " + state : ""}${zip ? " " + zip : ""}`
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.08)",
          my: "0.5rem"
        }}
      />

      {/* Logout */}
      <Button variant="plum-contained" onClick={onLogout} sx={{ mt: "0.5rem" }}>
        Log Out
      </Button>
    </Box>
  );
}