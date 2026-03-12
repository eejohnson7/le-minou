import { BookingProvider } from "../../context/BookingContext";
import { Routes, Route } from "react-router-dom";

import Service from "./Service";
import Pet from "./Pet";
import Duration from "./Duration";

export default function BookingLayout() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="service" element={<Service />} />
        <Route path="pet" element={<Pet />} />
        <Route path="duration" element={<Duration />} />
      </Routes>
    </BookingProvider>
  );
}