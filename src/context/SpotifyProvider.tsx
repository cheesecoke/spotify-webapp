import { useState, useEffect } from "react";
import { getSpotifySDK } from "lib/spotify";
import { SpotifyContext } from "hooks/useSpotify";
import { useNavigate } from "react-router-dom";

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sdk, setSdk] = useState<any>(null);

  useEffect(() => {
    const hasAuthCode = new URLSearchParams(window.location.search).has("code");
    const run = async () => {
      try {
        const sdkInstance = getSpotifySDK();
        setSdk(sdkInstance);
        const profile = await sdkInstance.currentUser.profile();
        setUser(profile);
        if (user && location.pathname === "/") {
          navigate("/home", { replace: true });
        }
      } catch (err) {
        console.error("SDK Error:", err);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    if (hasAuthCode || !user) {
      run();
    } else {
      setLoading(false);
    }
  }, [navigate, user]);

  return (
    <SpotifyContext.Provider value={{ user, loading, sdk }}>
      {children}
    </SpotifyContext.Provider>
  );
}
