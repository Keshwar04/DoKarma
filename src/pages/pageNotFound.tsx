/**
 * PageNotFound component
 *
 * Displays a 404 error page when a route is not found.
 * Provides a button to navigate back to the home page.
 *
 * Uses:
 * - useFormStore for managing active navbar state
 * - useNavigate for programmatic navigation
 * - Button component from UI library
 */

import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <h3 className="mb-3 text-red-500">404 | Page Not Found</h3>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
};

export default PageNotFound;
