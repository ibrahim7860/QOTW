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
  const { friendRequests, addFriend, removeFriendRequest } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState(friendRequests);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredFriends(friendRequests);
    } else {
      const filtered = friendRequests.filter((friend) =>
        friend.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  useEffect(() => {
    setFilteredFriends(friendRequests);
  }, [friendRequests]);

  const acceptFriendRequest = (id) => {
    const friendToAdd = friendRequests.find((friend) => friend.id === id);
    friendToAdd.isFriend = true;

    if (friendToAdd) {
      addFriend(friendToAdd);
      removeFriendRequest(id);
    }
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
            onRejectRequest={removeFriendRequest}
            onAcceptRequest={acceptFriendRequest}
            isRequest={true}
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
