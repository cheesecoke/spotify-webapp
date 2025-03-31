import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "components/Layouts/ProtectedLayout";
import Home from "pages/Home";
import Browse from "pages/Browse";
import { SpotifyProvider } from "context/SpotifyProvider";
import GlobalStyles from "styles/GlobalStyles";

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
        </Route>
      </Routes>
    </SpotifyProvider>
  );
}

export default App;
