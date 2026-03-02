import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { plumButton } from "../../styles/buttonStyles";

export default function PetPhotoUpload({ photoFile, onChange }) {
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button
        variant="outlined"
        component="label"
        sx={plumButton(true)}
      >
        Upload Pet Photo
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>

      {preview && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Avatar
            src={preview}
            alt="Pet preview"
            sx={{
              width: 80,
              height: 80,
              border: "2px solid #980061",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
          <Typography sx={{ color: "#980061" }}>{photoFile?.name}</Typography>
        </Box>
      )}
    </Box>
  );
}