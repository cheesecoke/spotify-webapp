import { Navigate, Outlet } from "react-router-dom";
import { useSpotify } from "./hooks/useSpotify";

const ProtectedLayout = () => {
  const { user, loading } = useSpotify();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
