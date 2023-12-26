import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export const FriendsHeader = () => {
  const [activeButton, setActiveButton] = useState("myFriends");
  const navigation = useNavigation();

  console.log(activeButton);

  const handleMyFriendsPress = () => {
    setActiveButton("myFriends");
    navigation.navigate("My Friends");
  };

  const handleFriendRequestsPress = () => {
    setActiveButton("friendRequests");
    navigation.navigate("Friend Requests");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={handleMyFriendsPress}
        style={
          activeButton === "myFriends" ? styles.activeButton : styles.button
        }
      >
        <Text style={styles.buttonText}>My Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleFriendRequestsPress}
        style={
          activeButton === "friendRequests"
            ? styles.activeButton
            : styles.button
        }
      >
        <Text style={styles.buttonText}>Friend Requests</Text>
      </TouchableOpacity>
      <View style={styles.topRightButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Responses")}>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#291400",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  topRightButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
