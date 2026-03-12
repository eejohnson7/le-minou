import { useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import logo from "../../assets/logo.png";

export default function PhotoUploader({
  src,
  onChange,
  shape = "circle", // "circle" or "rounded"
  size = 160,
  editable = true,
  uploading = false,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    if (editable) fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  const displayPhoto = preview || src || logo;

  // 🌸 Prevent clipping in circle mode
  const pencilOffset = shape === "circle" ? 15 : 8;

  return (
    <Box
      onClick={handleClick}
      component="label"
      sx={{
        position: "relative",
        width: size,
        height: size,
        cursor: editable ? "pointer" : "default",
        borderRadius: shape === "circle" ? "50%" : "12px",
        overflow: "hidden",
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
      ) : (
        <img
          src={displayPhoto}
          alt="photo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {editable && (
        <Box
          className="edit-icon"
          sx={{
            position: "absolute",
            bottom: pencilOffset,
            right: pencilOffset,
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: "#980061",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
          }}
        >
          <EditIcon sx={{ color: "white", fontSize: 18 }} />
        </Box>
      )}

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