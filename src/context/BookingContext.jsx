import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [serviceType, setServiceType] = useState(null);
  const [basePrice, setBasePrice] = useState(null);
  const [addons, setAddons] = useState([]);
  const [catCount, setCatCount] = useState(1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // ⭐ NEW: selected pets
  const [pets, setPets] = useState([]);

  return (
    <BookingContext.Provider
      value={{
        serviceType,
        setServiceType,
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
        setNotes,

        // ⭐ NEW
        pets,
        setPets
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}