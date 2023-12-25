import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { FriendItem } from "./FriendItem";
import defaultProfilePic from "../assets/default.jpeg";
import { SearchBar } from "./SearchBar";
import { useFriends } from "./FriendsContext";

export const MyFriends = () => {
  const { friends, removeFriend, handleSearch } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSearchChange = (query) => {
    const results = handleSearch(friends, query);
    setFilteredFriends(results);
  };

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#291400" }}>
      <Text style={styles.headerStyle}>My Friends</Text>
      <ScrollView>
        {filteredFriends.map((item) => (
          <FriendItem
            key={item.id.toString()}
            friend={item}
            onRemove={removeFriend}
            isRequest={false}
          />
        ))}
      </ScrollView>
      <SearchBar onSearch={handleSearchChange} />
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
