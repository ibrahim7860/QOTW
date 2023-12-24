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
import { useFriends } from "./FriendsContext";

export const FriendRequests = () => {
  const { addFriend } = useFriends();
  const [FriendRequests, setFriendRequests] = useState([
    {
      id: "1",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "2",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "3",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "4",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "5",
      fullName: "Jane Doe",
      username: "jane_doe",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "6",
      fullName: "Big Man",
      username: "big_man",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "7",
      fullName: "Gangatron Rex",
      username: "gang_rex",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "8",
      fullName: "Saad Syed",
      username: "saad_syed",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "9",
      fullName: "Silly Sully",
      username: "silly_sully",
      profilePicUri: defaultProfilePic,
      isFriend: false,
    },
    {
      id: "10",
      fullName: "Zubi Goat",
      username: "zubi_goat",
      profilePicUri: defaultProfilePic,
      isFriend: false,
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
      addFriend(friendToAdd);

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
