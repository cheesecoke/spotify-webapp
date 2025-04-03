import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "components/Layouts/ProtectedLayout";
import { SpotifyProvider } from "context/SpotifyProvider";
import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import Browse from "pages/Browse";
import Library from "pages/Library";
import Podcasts from "./pages/Podcasts/Podcasts";
import Audiobooks from "./pages/Audiobooks/Audiobooks";

function App() {
  return (
    <SpotifyProvider>
      <GlobalStyles />
      <Routes>
        {/* Protected Layout */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="library" element={<Library />} />
          <Route path="Podcasts" element={<Podcasts />} />
            <Route path="Audiobooks" element={<Audiobooks />} />
</Route>
      </Routes>
    </SpotifyProvider>
  );
}

export default App;
