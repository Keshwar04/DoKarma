/**
 * ProtectedRoute component
 *
 * Ensures that only authenticated users can access certain routes.
 * If the user is authenticated (has an authToken in localStorage),
 * it renders the child components. Otherwise, it redirects to the login page.
 *
 * @param {React.ReactNode} children - The child components to render if authenticated
 * @returns {React.ReactElement} The children or a redirect to the login page
 */

import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
