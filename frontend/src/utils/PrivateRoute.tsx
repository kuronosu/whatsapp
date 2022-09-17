import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetAuthLoading } from "../store/atoms/auth";

const PrivateRoute = () => {
  const { token } = useAuth();
  const loading = useGetAuthLoading();
  return !loading && token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
