import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import RequestCare from "./pages/RequestCare";
import NotFound from "./pages/NotFound";
import PrivateAccess from "./pages/PrivateAccess";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import "./styles/globals.css";

const privateAccessRoutes = [
  "sign-in",
  "create-account",
  "forgot-password",
  "reset-password",
  "profile",
  "edit-profile",
  "add-pet",
  "pet/:petId",
  "photo-library",
  "book/*"
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="request-care" element={<RequestCare />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          {privateAccessRoutes.map((path) => (
            <Route key={path} path={path} element={<PrivateAccess />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
