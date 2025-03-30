import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Home from "./pages/Home";
import { SpotifyProvider } from "./context/SpotifyProvider";

function App() {
  return (
    <SpotifyProvider>
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
