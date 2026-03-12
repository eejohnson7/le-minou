import { Box, Typography, IconButton } from "@mui/material";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";

export default function MonthlyCalendar({ selectedDates, setSelectedDates }) {
  const plum = "#980061";
  const pink = "#FFDBE9";

  const [month, setMonth] = React.useState(dayjs());

  const startOfMonth = month.startOf("month");
  const endOfMonth = month.endOf("month");

  // Determine the first day to show (start of week)
  const startOfGrid = startOfMonth.startOf("week");
  const endOfGrid = endOfMonth.endOf("week");

  // Build all days for the grid
  const days = [];
  let d = startOfGrid;
  while (d.isBefore(endOfGrid) || d.isSame(endOfGrid)) {
    days.push(d);
    d = d.add(1, "day");
  }

  const toggleDate = (dateStr) => {
    setSelectedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  return (
    <Box>
      {/* Month Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <IconButton onClick={() => setMonth(month.subtract(1, "month"))}>
          <ChevronLeftIcon sx={{ color: plum }} />
        </IconButton>

        <Typography sx={{ fontSize: "1.8rem", color: plum }}>
          {month.format("MMMM YYYY")}
        </Typography>

        <IconButton onClick={() => setMonth(month.add(1, "month"))}>
          <ChevronRightIcon sx={{ color: plum }} />
        </IconButton>
      </Box>

      {/* Weekday Labels */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          mb: 1
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Typography
            key={day}
            sx={{
              textAlign: "center",
              fontSize: "1.1rem",
              color: plum,
              opacity: 0.8
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1
        }}
      >
        {days.map((dayObj) => {
          const dateStr = dayObj.format("YYYY-MM-DD");
          const isCurrentMonth = dayObj.month() === month.month();
          const selected = selectedDates.includes(dateStr);

          return (
            <Box
              key={dateStr}
              onClick={() => toggleDate(dateStr)}
              sx={{
                p: 1.5,
                textAlign: "center",
                borderRadius: 2,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? plum : "transparent",
                backgroundColor: selected ? pink : "white",
                opacity: isCurrentMonth ? 1 : 0.35,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: selected ? pink : "rgba(152,0,97,0.05)",
                  borderColor: plum
                }
              }}
            >
              <Typography sx={{ color: plum, fontSize: "1.2rem" }}>
                {dayObj.date()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}