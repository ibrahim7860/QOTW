import React, {createContext, useContext, useState, useEffect} from "react";
import {userContext} from "./UserContext";

const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({children}) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchConversations = async (userId) => {
        if (userId) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/chats/user/${userId}`);  // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setConversations(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const updateLastMessage = (conversationId, lastMessage) => {
        setConversations((prevConversations) =>
            prevConversations.map((conv) =>
                conv.chatId === conversationId ? {...conv, lastMessage} : conv
            )
        );
    };

    return (
        <ConversationsContext.Provider value={{conversations, updateLastMessage, loading, error, fetchConversations}}>
            {children}
        </ConversationsContext.Provider>
    );
};
