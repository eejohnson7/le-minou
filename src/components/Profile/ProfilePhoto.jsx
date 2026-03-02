import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import logo from "../../assets/logo.png";

export default function ProfilePhoto({ currentUrl, onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const displayPhoto = preview || currentUrl || logo;

  return (
    <Box
      sx={{
        position: "relative",
        width: 140,
        height: 140,
        cursor: "pointer",
        "&:hover .edit-icon": { opacity: 1 }
      }}
      component="label"
    >
      <Avatar
        src={displayPhoto}
        alt="Profile photo"
        sx={{
          width: "100%",
          height: "100%",
          border: "3px solid #980061",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />

      {/* Hover Pencil */}
      <Box
        className="edit-icon"
        sx={{
          position: "absolute",
          bottom: 6,
          right: 6,
          width: 34,
          height: 34,
          borderRadius: "50%",
          backgroundColor: "#980061",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <EditIcon sx={{ color: "white", fontSize: 18 }} />
      </Box>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}