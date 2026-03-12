import TextField from "@mui/material/TextField";

export default function PetDateField({ label, value, onChange }) {
  const plum = "#980061";

  return (
    <TextField
      type="date"
      label={label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      InputLabelProps={{
        shrink: true,
        sx: { color: plum }
      }}
      InputProps={{
        sx: {
          fontSize: "1.25rem",
          color: plum
        }
      }}
      sx={{
        marginBottom: "1.5rem",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: plum
          },
          "&:hover fieldset": {
            borderColor: plum
          },
          "&.Mui-focused fieldset": {
            borderColor: plum
          }
        }
      }}
    />
  );
}