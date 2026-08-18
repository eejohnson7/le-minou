import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthUser();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
