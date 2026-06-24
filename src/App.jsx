import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import LanguageProvider from "./Contexts/LanguageContext";
import Packages from "./Components/Packages/Packages";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/admin"   element={<AdminDashboard />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
