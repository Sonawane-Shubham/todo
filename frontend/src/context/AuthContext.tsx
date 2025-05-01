import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: {
    name: string;
    token: string;
  };
  login: (token: string,name:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "",
    token: localStorage.getItem("token") || "",
  });


  const login = (token: string, name: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setUser({ name: name, token: token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser({name:"",token:""});
   
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
