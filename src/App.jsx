import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import CreateAccount from "./pages/Auth/SignUp";
import Services from "./pages/Service/Services";
import BookingLayout from "./pages/Service/BookingLayout";
import Profile from "./pages/Profile/Profile";
import AddPet from "./pages/Profile/AddPet";
import ProtectedRoute from "./routes/ProtectedRoute";
import PhotoLibrary from "./pages/PhotoLibrary";
import PetProfile from "./pages/Profile/PetProfile";
import "./styles/globals.css";

export default function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <main style={{ padding: "2rem" }}>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/photo-library" element={<PhotoLibrary />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Auth pages (public) */}
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected pages */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-pet"
              element={
                <ProtectedRoute>
                  <AddPet />
                </ProtectedRoute>
              }
            />

            <Route path="/book/*" element={<BookingLayout />} />

            <Route
              path="/pet/:petId"
              element={
                <ProtectedRoute>
                  <PetProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
  );
}