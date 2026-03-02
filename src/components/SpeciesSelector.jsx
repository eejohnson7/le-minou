import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SpeciesSelector({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel shrink>Species</InputLabel>

      <Select
        label="Species"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        notched
      >
        <MenuItem value="Cat">Cat</MenuItem>
        <MenuItem value="Dog">Dog</MenuItem>
      </Select>
    </FormControl>
  );
}