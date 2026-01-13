import { createContext, useContext, useState } from "react";
import { useUsers } from "./UserContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { users } = useUsers();   // ✅ NOW users is defined
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (email) => {
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) return false;

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
