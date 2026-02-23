import AppSpinner from "../components/shared-components/spinners/AppSpinner";
import { useAuth } from "../context/auth-context/AuthContextProvider";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AppSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
