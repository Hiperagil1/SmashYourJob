import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode; // Specificăm că 'children' poate fi orice element React
}

const AuthContext = createContext<any>(null); // Specificăm tipul valorii implicite

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verificăm dacă există o valoare stocată pentru isLoggedIn în sessionStorage
    const storedLoggedIn = sessionStorage.getItem("isLoggedIn");
    // Dacă există o valoare stocată, o vom folosi, altfel vom returna valoarea inițială false
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const login = () => {
    setIsLoggedIn(true);
    // Salvăm starea autentificării în sessionStorage când utilizatorul se autentifică
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Ștergem starea autentificării din sessionStorage când utilizatorul se deconectează
    sessionStorage.removeItem("isLoggedIn");
  };

  const closeLogIn = () => {
    setIsLoggedIn(true);
  };
  const openLogIn = () => {
    setIsLoggedIn(false);
  };

  // Restul codului rămâne neschimbat
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
