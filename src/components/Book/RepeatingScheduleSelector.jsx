import { Box, Typography } from "@mui/material";
import PetDateField from "../PetDateField";

export default function RepeatingScheduleSelector({ repeatSchedule, setRepeatSchedule }) {
  const plum = "#980061";
  const pink = "#FFDBE9";

  const toggleDay = (day) => {
    setRepeatSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day]
    }));
  };

  const daysOfWeek = [
    { key: "sun", label: "Sun" },
    { key: "mon", label: "Mon" },
    { key: "tue", label: "Tue" },
    { key: "wed", label: "Wed" },
    { key: "thu", label: "Thu" },
    { key: "fri", label: "Fri" },
    { key: "sat", label: "Sat" }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      {/* Day-of-week toggles */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
          mb: 3
        }}
      >
        {daysOfWeek.map((day) => {
          const selected = repeatSchedule.days.includes(day.key);

          return (
            <Box
              key={day.key}
              onClick={() => toggleDay(day.key)}
              sx={{
                p: 1.5,
                textAlign: "center",
                borderRadius: 2,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? plum : "#e0e0e0",
                backgroundColor: selected ? pink : "white",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: selected ? pink : "rgba(152,0,97,0.05)",
                  borderColor: plum
                }
              }}
            >
              <Typography sx={{ color: plum, fontSize: "1.2rem" }}>
                {day.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Start + End Dates */}
      <PetDateField
        label="Start Date"
        value={repeatSchedule.start}
        onChange={(val) =>
          setRepeatSchedule((prev) => ({ ...prev, start: val }))
        }
      />

      <PetDateField
        label="End Date"
        value={repeatSchedule.end}
        onChange={(val) =>
          setRepeatSchedule((prev) => ({ ...prev, end: val }))
        }
      />
    </Box>
  );
}