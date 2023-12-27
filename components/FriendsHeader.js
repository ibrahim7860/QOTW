import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export const FriendsHeader = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);

  const isActive = (routeName) => {
    const currentRoute = state.routes[state.index].name;
    return currentRoute === routeName;
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("My Friends")}
        style={isActive("My Friends") ? styles.activeButton : styles.button}
      >
        <Text style={styles.buttonText}>My Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Friend Requests")}
        style={
          isActive("Friend Requests") ? styles.activeButton : styles.button
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
    position: "relative",
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
