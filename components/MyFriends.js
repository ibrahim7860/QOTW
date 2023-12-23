import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { FriendItem } from "./FriendItem";
import defaultProfilePic from "../assets/default.jpeg";
import { SearchBar } from "./SearchBar";

export const MyFriends = () => {
  const [friends, setFriends] = useState([
    {
      id: "1",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "2",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "3",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "4",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "5",
      fullName: "Jane Doe",
      username: "jane_doe",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "6",
      fullName: "Big Man",
      username: "big_man",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "7",
      fullName: "Gangatron Rex",
      username: "gang_rex",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "8",
      fullName: "Saad Syed",
      username: "saad_syed",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "9",
      fullName: "Silly Sully",
      username: "silly_sully",
      profilePicUri: defaultProfilePic,
      isFriend: true,
    },
    {
      id: "10",
      fullName: "Zubi Goat",
      username: "zubi_goat",
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
