import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import LanguageProvider from "./Contexts/LanguageContext";
import Packages from "./Components/Packages/Packages";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Error from "./Components/Error";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/admin"   element={<AdminDashboard />} />
        <Route path="*"   element={<Error />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
