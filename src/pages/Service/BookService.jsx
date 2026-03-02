import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function BookServicePage() {
  const [service, setService] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    if (!service || !startDate || !endDate) {
      alert("Please select a service and both dates.");
      return;
    }

    const start = dayjs(startDate).format("MM/DD/YYYY");
    const end = dayjs(endDate).format("MM/DD/YYYY");

    alert(`Booking submitted for ${service} from ${start} to ${end}`);
  };

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "4rem auto",
        padding: "0 2rem",
        color: "#980061"
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: "2.5rem",
          marginBottom: "2rem",
          textAlign: "center"
        }}
      >
        Book a Service
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <TextField
          select
          label="Select a Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          fullWidth
        >
          <MenuItem value="30-minute visit">30-Minute Visit — $15</MenuItem>
          <MenuItem value="60-minute visit">60-Minute Visit — $25</MenuItem>
          <MenuItem value="dog walk">Dog Walk — $20 / 30 minutes</MenuItem>
        </TextField>

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            if (endDate && newValue && dayjs(newValue).isAfter(endDate)) {
              setEndDate(null);
            }
          }}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          minDate={startDate || undefined}
          onChange={(newValue) => setEndDate(newValue)}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#980061",
            "&:hover": { backgroundColor: "#7a004e" },
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
            borderRadius: "8px",
            marginTop: "1rem"
          }}
        >
          Submit Booking
        </Button>
      </Box>
    </Box>
  );
}

export default BookServicePage;