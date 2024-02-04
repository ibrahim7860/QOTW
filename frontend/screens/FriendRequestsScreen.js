import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import {FriendItem} from "../components/FriendItem";
import {Button} from "../components/Button";
import {SearchBar} from "../components/SearchBar";
import {useFriends} from "../context/FriendsContext";
import {FriendsHeader} from "../components/FriendsHeader";

export const FriendRequestsScreen = ({ navigation }) => {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#291400" }}>
        <FriendsHeader />
        <View style={styles.containerStyle}>
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
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
