import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function ProtectedRoute({ children }) {
  const authUser = useAuthUser();

  // Still loading auth state
  if (authUser === undefined) {
    return null; // or a loading spinner
  }

  // Not logged in → redirect once
  if (!authUser) {
    return <Navigate to="/sign-in" replace />;
  }

  // Logged in → render the page
  return children;
}