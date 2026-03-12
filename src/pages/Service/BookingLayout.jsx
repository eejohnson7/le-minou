import { BookingProvider } from "../../context/BookingContext";
import { Routes, Route } from "react-router-dom";

import BookService from "./BookService";
import PetSelection from "./PetSelection";

export default function BookingLayout() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="service" element={<BookService />} />
        <Route path="pet-selection" element={<PetSelection />} />
      </Routes>
    </BookingProvider>
  );
}