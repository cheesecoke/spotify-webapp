import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "components/Layouts/ProtectedLayout";
import Home from "pages/Home/Home";
import { SpotifyProvider } from "context/SpotifyProvider";
import GlobalStyles from "styles/GlobalStyles";

function App() {
  return (
    <SpotifyProvider>
      <GlobalStyles />
      <Routes>
        {/* Public */}
        <Route path="/" element={<ProtectedLayout />} />

        {/* Protected Layout */}
        <Route path="/home" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </SpotifyProvider>
  );
}

export default App;
