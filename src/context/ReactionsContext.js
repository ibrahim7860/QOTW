import React, { createContext, useState, useContext } from "react";
import defaultProfilePic from "../../assets/default.jpeg";

const ReactionsContext = createContext();

export const useReactions = () => useContext(ReactionsContext);

export const ReactionsProvider = ({ children }) => {
  const [reactions, setReactions] = useState([
    {
      id: "1",
      name: "Nayeem Belal",
      username: "ibbytoolittyiiiiii",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
    {
      id: "2",
      name: "Uzair Quraishi",
      username: "uzi",
      profilePic: defaultProfilePic,
      responseId: "3",
    },
    {
      id: "3",
      name: "Ibrahim Ahmed",
      username: "ibby",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
    {
      id: "4",
      name: "John Doe",
      username: "yourdad",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
    {
      id: "5",
      name: "Jane Doe",
      username: "yourmom",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
    {
      id: "6",
      name: "Janice Doe",
      username: "yoursister",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
    {
      id: "7",
      name: "James Bond",
      username: "yourbrother",
      profilePic: defaultProfilePic,
      responseId: "1",
    },
  ]);

  const addReaction = (newReaction) => {
    setReactions((currentReactions) => [...currentReactions, newReaction]);
  };

  return (
    <ReactionsContext.Provider value={{ reactions, addReaction }}>
      {children}
    </ReactionsContext.Provider>
  );
};
