import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if we're in the forgot password flow
    if (isAuthenticated && location.pathname !== "/forgot-password") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  // Only render children if user is not authenticated or if we're in the forgot password flow
  return !isAuthenticated || location.pathname === "/forgot-password" ? (
    <>{children}</>
  ) : null;
};

export default AuthGuard;
