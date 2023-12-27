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
      lastMessage: null,
      profilePicUri: defaultProfilePic,
    },
    {
      id: "2",
      name: "Nayeem Belal",
      lastMessage: null,
      profilePicUri: defaultProfilePic,
    },
  ]);

  const updateLastMessage = (conversationId, lastMessage) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId ? { ...conv, lastMessage } : conv
      )
    );
  };

  return (
    <ConversationsContext.Provider value={{ conversations, updateLastMessage }}>
      {children}
    </ConversationsContext.Provider>
  );
};
