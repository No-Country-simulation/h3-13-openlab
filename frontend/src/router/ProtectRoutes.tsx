import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    toast.error("Login is needed", {
      style: { backgroundColor: "#991e2a", color: "#fff" },
    });
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
