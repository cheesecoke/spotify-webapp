import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "components/Layouts/ProtectedLayout";
import { SpotifyProvider } from "context/SpotifyProvider";
import { PlayerProvider } from "context/PlayerProvider";
import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import Browse from "pages/Browse";
import Library from "pages/Library";
import Podcasts from "./pages/Podcasts/Podcasts";
import Audiobooks from "./pages/Audiobooks/Audiobooks";
import Artists from "./pages/Artists/Artists";
import Albums from "./pages/Albums/Albums";

function App() {
  return (
    <SpotifyProvider>
      <PlayerProvider>
        <GlobalStyles />
        <Routes>
          {/* Protected Layout */}
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="library" element={<Library />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="audiobooks" element={<Audiobooks />} />
            <Route path="artists" element={<Artists />} />
            <Route path="albums" element={<Albums />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </SpotifyProvider>
  );
}

export default App;
