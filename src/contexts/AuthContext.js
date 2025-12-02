import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLogged");
    setIsLogged(stored === "true");
  }, []);

  const login = () => {
    localStorage.setItem("isLogged", "true");
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("isLogged");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
