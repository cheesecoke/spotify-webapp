import { Navigate } from "react-router-dom";
import { useSpotify } from "../hooks/useSpotify";

const Login = () => {
  const { user, getSdkAndUser } = useSpotify();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div style={{ color: "black", padding: "2rem" }}>
      <h1>Login</h1>
      <p>You are not logged in.</p>
      <button onClick={getSdkAndUser} style={{ marginTop: "1rem" }}>
        Sign in with Spotify
      </button>
    </div>
  );
};

export default Login;
