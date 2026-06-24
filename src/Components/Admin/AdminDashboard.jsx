import { useState } from "react";
import LoginScreen from "./LoginScreen";
import Dashboard from "./Dashboard";


export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) 
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  

  return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
}
