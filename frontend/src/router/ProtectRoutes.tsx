import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

interface AuthState {
  token: string | null;
  user: {
    id: string | null;
    role: string;
    name: string;
    lastName: string;
  };
}

interface RootState {
  auth: AuthState;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { role } = user;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
