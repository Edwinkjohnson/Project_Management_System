import { createContext, useContext, useState, useEffect } from "react";
import * as userApi from "../api/userApi";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      if (!user) return;
      try {
        const res = await userApi.fetchUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, [user]);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
