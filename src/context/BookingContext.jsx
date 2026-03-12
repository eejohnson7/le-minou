import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // ⭐ Selected pets (IDs)
  const [pets, setPets] = useState([]);

  // ⭐ Selected service
  const [service, setService] = useState(null);

  // ⭐ Duration (30 or 60)
  const [duration, setDuration] = useState(null);

  // ⭐ Scheduling
  const [dateMode, setDateMode] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });
  const [specificDates, setSpecificDates] = useState([]);
  const [repeatSchedule, setRepeatSchedule] = useState({
    days: [],        // ["mon", "wed"]
    start: null,     // "2026-03-20"
    end: null        // "2026-04-10"
  });

  return (
    <BookingContext.Provider
      value={{
        pets,
        setPets,

        service,
        setService,

        duration,
        setDuration,

        dateMode,
        setDateMode,

        dateRange,
        setDateRange,

        specificDates,
        setSpecificDates,

        repeatSchedule,
        setRepeatSchedule
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}