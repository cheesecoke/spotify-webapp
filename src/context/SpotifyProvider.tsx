import { useState } from "react";
import { getSpotifySDK } from "../lib/spotify";
import { SpotifyContext } from "../hooks/useSpotify";
import { useNavigate } from "react-router-dom";

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sdk, setSdk] = useState<any>(null);

  async function getSdkAndUser() {
    try {
      console.log("getSdkAndUser: start");
      const sdkInstance = getSpotifySDK();
      setSdk(sdkInstance);
      const profile = await sdkInstance.currentUser.profile();
      setUser(profile);
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("SDK Error:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }

  return (
    <SpotifyContext.Provider value={{ user, loading, sdk, getSdkAndUser }}>
      {children}
    </SpotifyContext.Provider>
  );
}
