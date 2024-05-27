import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const userContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(null);
  const [globalUserId, setGlobalUserId] = useState(null);
  const [globalFullName, setGlobalFullName] = useState("");

  const fetchAllUsers = () => {
    axios
      .get(`http://192.168.200.128:8080/users/`)
      .then((response) => setAllUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const refreshUsers = () => {
    fetchAllUsers();
  };

  return (
    <UserContext.Provider
      value={{
        allUsers,
        setAllUsers,
        globalUserId,
        setGlobalUserId,
        globalFullName,
        setGlobalFullName,
        refreshUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
