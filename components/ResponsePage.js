import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Response } from "./Response";
import defaultProfilePic from "../assets/default.jpeg";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ripple from "react-native-material-ripple";

export const ResponsePage = () => {
  const friends = [
    {
      id: "1",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and c.",
    },
    {
      id: "2",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "3",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "4",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "5",
      fullName: "Jane Doe",
      username: "jane_doe",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "6",
      fullName: "Big Man",
      username: "big_man",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "7",
      fullName: "Gangatron Rex",
      username: "gang_rex",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "8",
      fullName: "Saad Syed",
      username: "saad_syed",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "9",
      fullName: "Silly Sully",
      username: "silly_sully",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "10",
      fullName: "Zubi Goat",
      username: "zubi_goat",
      profilePicUri: defaultProfilePic,
      isFriend: true,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
  ];
  const myResponse = {
    id: "10",
    fullName: "Nayeem Belal",
    username: "nabansnd",
    profilePicUri: defaultProfilePic,
    isFriend: true,
    userResponse:
      "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#291400" }}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.arrowContainer}>
          <Icon name="user-friends" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerStyle}>QOTW</Text>
        <TouchableOpacity>
          <Icon name="user-alt" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
        >
          <TouchableOpacity>
            <View style={styles.myBoxStyle}>
              <Text style={styles.myResponseStyle}>
                {myResponse.userResponse}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.myTextStyle}>Your Response</Text>
            </View>
          </TouchableOpacity>
          {friends.map((item) => (
            <Response user={item} />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    padding: 15,
    alignItems: "center",
    marginHorizontal: "20%",
  },
  topContainer: {
    backgroundColor: "#291400",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  myBoxStyle: {
    backgroundColor: "#ababab",
    borderRadius: 20,
    borderColor: "#ababab",
    borderWidth: 2,
    padding: "5%",
    margin: 30,
    marginVertical: 10,
  },
  myResponseStyle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1b0a01",
  },
  myTextStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ababab",
  },
});
