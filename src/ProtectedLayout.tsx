import { Navigate, Outlet } from "react-router-dom";
import { useSpotify } from "./hooks/useSpotify";

const ProtectedLayout = () => {
  const { user } = useSpotify();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
