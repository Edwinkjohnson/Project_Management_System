import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const initialUsers = [
  { id: 1, name: "Admin", email: "admin@team.com", role: "admin" },
  { id: 2, name: "Manager", email: "manager@team.com", role: "manager" },
  { id: 3, name: "Alice", email: "alice@team.com", role: "member" },
  { id: 4, name: "Bob", email: "bob@team.com", role: "member" },
  { id: 5, name: "Charlie", email: "charlie@team.com", role: "member" }
];

export const UserProvider = ({ children }) => {
  const [users] = useState(initialUsers);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
