
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
