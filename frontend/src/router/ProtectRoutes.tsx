import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { selectTokenUser } from "../store/auth/authSlice";

const ProtectedRoute = () => {
  const token = useSelector(selectTokenUser);

  if (!token) {
    toast.error("Login is needed", {
      style: { backgroundColor: "#991e2a", color: "#fff" },
    });
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
