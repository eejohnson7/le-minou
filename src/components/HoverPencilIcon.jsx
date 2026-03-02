import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export default function HoverPencilIcon({
  size = 34,
  iconSize = 18,
  color = "#980061",
  bottom = 6,
  right = 6,
  className = "edit-icon"
}) {
  return (
    <Box
      className={className}
      sx={{
        position: "absolute",
        bottom,
        right,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.25s ease"
      }}
    >
      <EditIcon sx={{ color: "white", fontSize: iconSize }} />
    </Box>
  );
}