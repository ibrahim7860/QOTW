import React, { createContext, useState, useContext } from "react";
import defaultProfilePic from "../../assets/default.jpeg";

const ReactionsContext = createContext();

export const useReactions = () => useContext(ReactionsContext);

export const ReactionsProvider = ({ children }) => {
    const [reactions, setReactions] = useState([
        {
            username: "namblal",
            profilePic: defaultProfilePic,
        },
        {
            username: "uzi",
            profilePic: defaultProfilePic,
        },
        {
            username: "ibby",
            profilePic: defaultProfilePic,
        },
        {
            username: "yourdad",
            profilePic: defaultProfilePic,
        },
        {
            username: "yourmom",
            profilePic: defaultProfilePic,
        },
        {
            username: "yoursister",
            profilePic: defaultProfilePic,
        },
        {
            username: "yourbrother",
            profilePic: defaultProfilePic,
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