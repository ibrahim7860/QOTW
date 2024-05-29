import React, {createContext, useContext, useState} from "react";

const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({children}) => {
    const [conversations, setConversations] = useState();

    const updateLastMessage = (conversationId, lastMessage) => {
        setConversations((prevConversations) =>
            prevConversations.map((conv) =>
                conv.id === conversationId ? {...conv, lastMessage} : conv
            )
        );
    };

    return (
        <ConversationsContext.Provider value={{conversations, updateLastMessage}}>
            {children}
        </ConversationsContext.Provider>
    );
};
