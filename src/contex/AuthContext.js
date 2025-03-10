import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logdata, setlogData] = useState("Login");
  const [path, setPath] = useState("login");
   const [accessToken,setaccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ setaccessToken,accessToken,logdata, setlogData, path, setPath }}>
      {children}
    </AuthContext.Provider>
  );
};