import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode; // Specificăm că 'children' poate fi orice element React
}

const AuthContext = createContext<any>(null); // Specificăm tipul valorii implicite

export const useAuth = () => {
  return useContext(AuthContext);
};

// ... (restul codului rămâne neschimbat)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verificăm dacă există o valoare stocată pentru isLoggedIn în sessionStorage
    const storedLoggedIn = sessionStorage.getItem("isLoggedIn");
    // Dacă există o valoare stocată, o vom folosi, altfel vom returna valoarea inițială false
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [username, setUsername] = useState(() => {
    const storedUsername = sessionStorage.getItem("username");
    return storedUsername ? storedUsername : "";
  });

  const [accountType, setAccountType] = useState(() => {
    const storedAccountType = sessionStorage.getItem("accountType");
    return storedAccountType ? JSON.parse(storedAccountType) : false;
  });

  const login = (newUsername: string, accountType: boolean) => {
    setIsLoggedIn(true);
    setUsername(newUsername);
    setAccountType(accountType);
    // Salvăm starea autentificării și username-ul în sessionStorage când utilizatorul se autentifică
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
    sessionStorage.setItem("username", newUsername);
    sessionStorage.setItem("accountType", JSON.stringify(accountType));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    // Ștergem starea autentificării și username-ul din sessionStorage când utilizatorul se deconectează
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("accountType");
  };

  const contextValue = {
    accountType,
    isLoggedIn,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
