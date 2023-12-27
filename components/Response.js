import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

export const Response = ({ user }) => {
  const navigation = useNavigation();

  const goToFriendProfile = () => {
    navigation.navigate("Friend Profile", {
      fullName: user.fullName,
      username: user.username,
      isAdding: false,
    });
  };

  return (
    <View style={styles.responseBox}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button onPress={goToFriendProfile}>
          <Image
            source={require("../assets/default.jpeg")}
            style={styles.profilePic}
          />
        </Button>
        <View style={{ flexDirection: "column", padding: 10 }}>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.responseText}>{user.username}</Text>
        </View>
      </View>
      <View style={styles.containerStyle}>
        <Text style={styles.repsonseText}>{user.userResponse}</Text>
        <View style={styles.textInputStyle}>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Start a conversation"
              placeholderTextColor="#ababab"
              keyboardAppearance="dark"
              selectionColor={"white"}
              style={styles.textInputStyle}
            />
          </View>

          <View style={{ justifyContent: "center" }}>
            <Button onPress={() => console.log("Submit Pressed")}>
              <Image
                source={require("../assets/send.png")}
                style={{ width: 25, height: 25 }}
              />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  responseBox: {
    alignSelf: "center",
    padding: "2%",
    marginVertical: "3%",
  },
  repsonseText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    marginVertical: "4%",
  },
  profilePic: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 40,
  },
  fullName: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
  responseText: {
    color: "white",
  },
  containerStyle: {
    backgroundColor: "#1b0a01",
    padding: "5%",
    paddingTop: 0,
    borderRadius: 20,
    borderColor: "#ababab",
    borderWidth: 2,
    width: 350,
  },
  textInputStyle: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    backgroundColor: "#424140",
    borderRadius: 10,
    paddingTop: 7,
    padding: 7,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
