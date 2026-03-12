import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export default function HoverPencil({
  size = 34,
  iconSize = 18,
  color = "#980061",
  bottom = 6,
  right = 6,
  className = "edit-icon",
  onClick
}) {
  return (
    <Box
      className={className}
      onClick={onClick}
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
        transition: "opacity 0.25s ease",
        cursor: "pointer",
        pointerEvents: "auto",
        zIndex: 3
      }}
    >
      <EditIcon sx={{ color: "white", fontSize: iconSize }} />
    </Box>
  );
}