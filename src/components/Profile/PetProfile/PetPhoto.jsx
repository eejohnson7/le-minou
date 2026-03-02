import { useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePetPhoto } from "../../../hooks/usePetPhoto";
import HoverPencilIcon from "../../HoverPencilIcon";

export default function PetPhoto({ pet, editable = false }) {
  const fileInputRef = useRef(null);
  const { uploadPetPhoto, uploading } = usePetPhoto();
  const [previewUrl, setPreviewUrl] = useState(pet.photo_url);

  const handleClick = () => {
    if (editable) fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    const newUrl = await uploadPetPhoto(pet.id, file);
    if (newUrl) setPreviewUrl(newUrl);
  };

  const displayPhoto = previewUrl || pet.photo_url;

  return (
    <Box
      onClick={handleClick}
      component="label"
      sx={{
        position: "relative",
        width: 180,
        height: 180,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: editable ? "pointer" : "default",
        border: "2px solid #980061",
        backgroundColor: "#fdf7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover .edit-icon": {
          opacity: editable ? 1 : 0,
        },
      }}
    >
      {uploading ? (
        <CircularProgress sx={{ color: "#980061" }} />
      ) : displayPhoto ? (
        <img
          src={displayPhoto}
          alt={pet.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            color: "#980061",
            opacity: 0.6,
            fontSize: "1rem",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          {editable ? "Click to upload photo" : "No photo"}
        </Box>
      )}

      {editable && <HoverPencilIcon />}

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
}