export const plumButton = (active) => ({
  textTransform: "none",
  borderColor: "#980061 !important",
  color: active ? "white" : "#980061",
  backgroundColor: active ? "#980061" : "transparent",
  "&:hover": {
    borderColor: "#980061",
    backgroundColor: active ? "#7a004e" : "rgba(152, 0, 97, 0.08)"
  }
});