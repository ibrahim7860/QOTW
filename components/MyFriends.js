import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { FriendItem } from "./FriendItem";
import defaultProfilePic from "../assets/default.jpeg";
import { SearchBar } from "./SearchBar";

export const MyFriends = () => {
  const [friends, setFriends] = useState([
    {
      id: "3",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
  ]);

  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter((friend) =>
        friend.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  const removeFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headerStyle}>My Friends</Text>
      <ScrollView>
        {filteredFriends.map((item) => (
          <FriendItem
            key={item.id.toString()}
            friend={item}
            onRemove={removeFriend}
          />
        ))}
      </ScrollView>
      <SearchBar onSearch={handleSearch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 20,
    color: "white",
  },
});
