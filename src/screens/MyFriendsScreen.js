import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import {FriendItem} from "../components/FriendItem";
import {SearchBar} from "../components/SearchBar";
import {useFriends} from "../context/FriendsContext";
import {FriendsHeader} from "../components/FriendsHeader";

export const MyFriendsScreen = ({ navigation }) => {
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
      <FriendsHeader />
      <View style={styles.containerStyle}>
        <Text style={styles.headerStyle}>My Friends</Text>
      </View>
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
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerStyle: {
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
    color: "white",
    fontWeight: "bold",
  },
});
