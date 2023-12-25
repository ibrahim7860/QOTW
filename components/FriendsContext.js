import React, { createContext, useState, useContext } from "react";
import defaultProfilePic from "../assets/default.jpeg";

const FriendsContext = createContext();

export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([
    // Your initial friends data
  ]);

  const [friendRequests, setFriendRequests] = useState([
    {
      id: "1",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "2",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "3",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "5",
      fullName: "Jane Doe",
      username: "jane_doe",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "6",
      fullName: "Big Man",
      username: "big_man",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "7",
      fullName: "Gangatron Rex",
      username: "gang_rex",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "8",
      fullName: "Saad Syed",
      username: "saad_syed",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "9",
      fullName: "Silly Sully",
      username: "silly_sully",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "10",
      fullName: "Zubi Goat",
      username: "zubi_goat",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
  ]);

  const addFriend = (newFriend) => {
    setFriends((currentFriends) => [...currentFriends, newFriend]);
  };

  const removeFriend = (id) => {
    setFriends((currentFriends) =>
      currentFriends.filter((friend) => friend.id !== id)
    );
  };

  const acceptFriendRequest = (id) => {
    const friendToAdd = friendRequests.find((friend) => friend.id === id);
    if (friendToAdd) {
      friendToAdd.isFriend = true;
      addFriend(friendToAdd);
      removeFriendRequest(id);
    }
  };

  const removeFriendRequest = (id) => {
    setFriendRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== id)
    );
  };

  const handleSearch = (array, query) => {
    if (query.trim() === "") {
      return array;
    } else {
      return array.filter((friend) =>
        friend.fullName.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        removeFriend,
        friendRequests,
        removeFriendRequest,
        acceptFriendRequest,
        handleSearch,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
