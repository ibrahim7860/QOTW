import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { FriendItem } from "./FriendItem";
import defaultProfilePic from "../assets/default.jpeg";

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
        data={friends}
        renderItem={({ item }) => (
          <FriendItem friend={item} onRemove={removeFriend} />
        )}
        keyExtractor={(item) => item.id}
      />
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
