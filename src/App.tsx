import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import PlayPage from "./pages/PlayPage";
import Category from "./pages/Category/Category";
import ShowDetails from "./pages/ShowDetails";
import GlobalPlayer from "./components/GlobalPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <SpotifyProvider>
      <PlayerProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Routes>
            {/* Protected Layout */}
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="browse" element={<Browse />} />
              <Route path="library" element={<Library />} />
              <Route path="podcasts" element={<Podcasts />} />
              <Route path="audiobooks" element={<Audiobooks />} />
              <Route path="artists" element={<Artists />} />
              <Route path="albums" element={<Albums />} />
              <Route path="play" element={<PlayPage />} />

              <Route path="artist/:id" element={<PlayPage />} />
              <Route path="album/:id" element={<PlayPage />} />
              <Route path="playlist/:id" element={<PlayPage />} />
              <Route path="track/:id" element={<PlayPage />} />
              <Route path="track/:id" element={<PlayPage />} />
              <Route path="show/:id" element={<ShowDetails />} />
              <Route path="category/:id" element={<Category />} />
              <Route path="ShowDetails" element={<ShowDetails />} />
            </Route>
          </Routes>
          <GlobalPlayer />
        </QueryClientProvider>
      </PlayerProvider>
    </SpotifyProvider>
  );
}

export default App;
