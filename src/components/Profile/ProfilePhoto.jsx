import HoverPencilIcon from "..//HoverPencilIcon";
import { Avatar, Box } from "@mui/material";
import { useState } from "react";

export default function ProfilePhoto({ currentUrl, onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
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

      <HoverPencilIcon />

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}