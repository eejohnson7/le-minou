import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { useState } from "react";
import PetDateField from "../../components/PetDateField";
import MonthlyCalendar from "../../components/Book/MonthlyCalendar";
import RepeatingScheduleSelector from "../../components/Book/RepeatingScheduleSelector";

export default function Date() {
  const navigate = useNavigate();

  const { 
    dateMode,
    setDateMode,
    dateRange,
    setDateRange,
    specificDates,
    setSpecificDates,
    repeatSchedule,
    setRepeatSchedule
  } = useBooking();

  const [localMode, setLocalMode] = useState(dateMode);

  const handleContinue = () => {
    setDateMode(localMode);
    navigate("/book/time");
  };

  const modeSelected = Boolean(localMode);

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", px: 2, py: 4 }}>
      <Typography sx={{ mb: 3, fontSize: "3rem" }}>
        Choose your schedule
      </Typography>

      {/* Mode Selector */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        {[
          { key: "range", label: "Date Range" },
          { key: "specific", label: "Specific Days" },
          { key: "repeat", label: "Repeating" }
        ].map((mode) => (
          <Box
            key={mode.key}
            onClick={() => setLocalMode(mode.key)}
            sx={{
              flex: 1,
              textAlign: "center",
              p: 2,
              borderRadius: 3,
              border: "2px solid",
              borderColor:
                localMode === mode.key ? "#980061" : "#e0e0e0",
              backgroundColor:
                localMode === mode.key ? "#FFDBE9" : "#FFF5F6",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  localMode === mode.key
                    ? "#FFDBE9"
                    : "rgba(152,0,97,0.05)"
              }
            }}
          >
            <Typography sx={{ fontSize: "1.4rem", color: "#980061" }}>
              {mode.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Conditional UI */}
      {localMode === "range" && (
        <Box sx={{ mb: 4 }}>
          {/* Date Range Picker goes here */}
          <Typography sx={{ fontSize: "1.5rem" }}>Select a start and end date</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
              <PetDateField
                label="Start Date"
                value={dateRange.start}
                onChange={(val) =>
                setDateRange((prev) => ({ ...prev, start: val }))
                }
            />

            <PetDateField
                label="End Date"
                value={dateRange.end}
                onChange={(val) =>
                setDateRange((prev) => ({ ...prev, end: val }))
                }
            />
          </Box>
        </Box>
      )}

      {localMode === "specific" && (
        <Box sx={{ mb: 4 }}>
          {/* Multi-select calendar */}
          <Typography sx={{ fontSize: "1.5rem" }}>Select individual days</Typography>
            <MonthlyCalendar
                selectedDates={specificDates}
                setSelectedDates={setSpecificDates}
            />
        </Box>
      )}

      {localMode === "repeat" && (
        <Box sx={{ mb: 4 }}>
          {/* Repeating schedule UI */}
          <Typography sx={{ fontSize: "1.5rem" }}>Choose repeating days</Typography>
            <RepeatingScheduleSelector
                repeatSchedule={repeatSchedule}
                setRepeatSchedule={setRepeatSchedule}
            />
        </Box>
      )}

      <Button
        variant={modeSelected ? "plum-contained" : "plum-outlined"}
        disabled={!modeSelected}
        onClick={handleContinue}
        sx={{ width: "100%", borderRadius: 2, py: 1.5, fontSize: "1.75rem" }}
      >
        Continue
      </Button>
    </Box>
  );
}