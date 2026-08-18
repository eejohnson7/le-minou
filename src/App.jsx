import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import CreateAccount from "./pages/Auth/SignUp";
import Services from "./pages/Services";
import BookingLayout from "./pages/Book/BookingLayout";
import Profile from "./pages/Profile/Profile";
import AddPet from "./pages/Profile/AddPet";
import ProtectedRoute from "./routes/ProtectedRoute";
import PhotoLibrary from "./pages/PhotoLibrary";
import PetProfile from "./pages/Profile/PetProfile";
import RequestCare from "./pages/RequestCare";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import ClientLayout from "./layouts/ClientLayout";
import BookingShell from "./layouts/BookingShell";
import "./styles/globals.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="request-care" element={<RequestCare />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="add-pet" element={<AddPet />} />
          <Route path="pet/:petId" element={<PetProfile />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <BookingShell />
            </ProtectedRoute>
          }
        >
          <Route path="book/*" element={<BookingLayout />} />
        </Route>

        <Route path="photo-library" element={<PhotoLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}
