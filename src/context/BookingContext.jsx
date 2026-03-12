import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // ⭐ Selected pets (IDs)
  const [pets, setPets] = useState([]);

  // ⭐ Selected service
  const [service, setService] = useState(null);

  // ⭐ Duration (30 or 60)
  const [duration, setDuration] = useState(null);

  // ⭐ Pricing + add-ons
  const [basePrice, setBasePrice] = useState(null);
  const [addons, setAddons] = useState([]);
  const [catCount, setCatCount] = useState(1);

  // ⭐ Scheduling
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // ⭐ Visit details
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <BookingContext.Provider
      value={{
        pets,
        setPets,

        service,
        setService,

        duration,
        setDuration,

        basePrice,
        setBasePrice,

        addons,
        setAddons,

        catCount,
        setCatCount,

        date,
        setDate,

        time,
        setTime,

        address,
        setAddress,

        notes,
        setNotes
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}