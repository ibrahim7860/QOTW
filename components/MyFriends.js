import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { FriendItem } from "./FriendItem";
import defaultProfilePic from "../assets/default.jpeg";
import { SearchBar } from "./SearchBar";

export const MyFriends = () => {
  const [friends, setFriends] = useState([
    {
      id: "1",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
    },
    {
      id: "2",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
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
  console.log(friends);
  if (!friends) {
    console.log("Empty");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Friends</Text>
      <FlatList
        data={filteredFriends}
        renderItem={({ item }) => (
          <FriendItem friend={item} onRemove={removeFriend} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <SearchBar onSearch={handleSearch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 20,
    color: "white",
  },
});
