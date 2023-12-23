import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { FriendItem } from "./FriendItem";
import { Button } from "./Button";
import defaultProfilePic from "../assets/default.jpeg";
import { SearchBar } from "./SearchBar";

export const FriendRequests = () => {
  const [FriendRequests, setFriendRequests] = useState([
    {
      id: "3",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
  ]);

  const [friends, setFriends] = useState([
    {
      id: "1",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "2",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
  ]);

  const [filteredFriends, setFilteredFriends] = useState(FriendRequests);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredFriends(FriendRequests);
    } else {
      const filtered = FriendRequests.filter((friend) =>
        friend.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  useEffect(() => {
    setFilteredFriends(FriendRequests);
  }, [FriendRequests]);

  const acceptFriendRequest = (id) => {
    const friendToAdd = FriendRequests.find((friend) => friend.id === id);
    friendToAdd.isFriend = true;

    if (friendToAdd) {
      setFriends((currentFriends) => [...currentFriends, friendToAdd]);

      setFriendRequests((currentRequests) =>
        currentRequests.filter((friend) => friend.id !== id)
      );
    }
  };

  const removeFriendRequest = (id) => {
    setFriendRequests(FriendRequests.filter((friend) => friend.id !== id));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.headerStyle}>Friend Requests</Text>
      </View>
      <ScrollView>
        {filteredFriends.map((item) => (
          <FriendItem
            key={item.id.toString()}
            friend={item}
            onRemove={removeFriendRequest}
            onAcceptRequest={acceptFriendRequest}
          />
        ))}
      </ScrollView>
      <SearchBar onSearch={handleSearch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 20,
    color: "white",
  },
});
