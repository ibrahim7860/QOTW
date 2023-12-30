import React, { createContext, useState, useContext } from "react";
import defaultProfilePic from "../../assets/default.jpeg";

const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState([
    // Placeholder data
    {
      id: "1",
      name: "John Doe",
      username: "john_doe",
      lastMessage: null,
      profilePicUri: defaultProfilePic,
    },
    {
      id: "2",
      name: "Ibrahim Ahmed",
      username: "ibbytoolitty",
      lastMessage: null,
      profilePicUri: defaultProfilePic,
    },
  ]);

  return (
    <ConversationsContext.Provider value={{ conversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};
