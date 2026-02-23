import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/auth-context/AuthContextProvider";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from =
    location.state?.from?.pathname == "/"
      ? "/feed"
      : location.state?.from?.pathname || "/feed";
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  return <>{children}</>;
}
