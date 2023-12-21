import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Shadow } from "react-native-shadow-2";
import defaultProfilePic from "./assets/default.jpeg";
import Ripple from "react-native-material-ripple";

export const FriendProfile = ({ firstName, lastName, username, isAdding }) => {
  const handleCancelClick = () => {
    console.log("Hello there");
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.arrowContainer}>
        <Ripple
          rippleColor="#fff"
          rippleOpacity={0.9}
          rippleSize={100}
          onPress={handleCancelClick}
        >
          <Icon name="close" size={30} color="white" />
        </Ripple>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Shadow distance="10" radius="5" size="10">
            <Image source={defaultProfilePic} style={styles.profilePic} />
          </Shadow>
        </View>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.username}>{username}</Text>
        {isAdding && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Add friend clicked")}
          >
            <Icon name="person-add" size={20} color="black" />
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    position: "relative",
  },
  profilePic: {
    width: 170,
    height: 170,
    borderRadius: 150,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  username: {
    fontSize: 15,
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#291400",
  },
  arrowContainer: {
    position: "absolute",
    top: "7%",
    right: "5%",
    zIndex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: "25%",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: "black",
    fontSize: 16,
  },
});
