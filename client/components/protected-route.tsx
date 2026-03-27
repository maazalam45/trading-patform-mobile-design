import { useAuth } from "@/context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  guestOnly?: boolean;
};

export default function ProtectedRoute({ guestOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!guestOnly && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (guestOnly && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
