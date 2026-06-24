import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";

const LanguageContext = createContext(null);

const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState(localStorage.getItem("lang") ?? "");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ToastContainer
        position={language === "ar" ? "bottom-left" : "bottom-right"}
      />
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
export { LanguageContext };
