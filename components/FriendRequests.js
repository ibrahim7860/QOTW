import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { FriendItem } from "./FriendItem";
import { Button } from "./Button";
import defaultProfilePic from "../assets/default.jpeg";

export const FriendRequests = () => {
  const [FriendRequests, setFriendRequests] = useState([
    {
      id: "3",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
    },
    {
      id: "4",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
    },
  ]);

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

  const acceptFriendRequest = (id) => {
    const friendToAdd = FriendRequests.find((friend) => friend.id === id);

    if (friendToAdd) {
      setFriends((currentFriends) => [...currentFriends, friendToAdd]);

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
        {FriendRequests.map((item) => (
          <FriendItem
            key={item.id}
            friend={item}
            onRemove={removeFriendRequest}
            onAcceptRequest={acceptFriendRequest}
            isAdding={true}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <TextInput
            placeholder="Add or search friends"
            placeholderTextColor="#ababab"
            keyboardAppearance="dark"
            selectionColor="white"
            style={styles.textInputStyle}
          />
        </View>
      </KeyboardAvoidingView>
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

  textInputStyle: {
    fontSize: 17,
    color: "white",
    fontWeight: "400",
    padding: 14,
    backgroundColor: "#424140",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
