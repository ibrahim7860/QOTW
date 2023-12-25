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
import { SearchBar } from "./SearchBar";
import { useFriends } from "./FriendsContext";

export const FriendRequests = () => {
  const {
    friendRequests,
    removeFriendRequest,
    acceptFriendRequest,
    handleSearch,
  } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState(friendRequests);

  const handleSearchChange = (query) => {
    const results = handleSearch(friendRequests, query);
    setFilteredFriends(results);
  };

  useEffect(() => {
    setFilteredFriends(friendRequests);
  }, [friendRequests]);

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
            onRejectRequest={removeFriendRequest}
            onAcceptRequest={acceptFriendRequest}
            isRequest={true}
          />
        ))}
      </ScrollView>
      <SearchBar onSearch={handleSearchChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#291400",
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
