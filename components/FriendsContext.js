import React, { createContext, useState, useContext } from "react";

const FriendsContext = createContext();

export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([
    // Your initial friends data
  ]);

  const addFriend = (newFriend) => {
    setFriends((currentFriends) => [...currentFriends, newFriend]);
  };

  const removeFriend = (id) => {
    setFriends((currentFriends) =>
      currentFriends.filter((friend) => friend.id !== id)
    );
  };

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
      {children}
    </FriendsContext.Provider>
  );
};
