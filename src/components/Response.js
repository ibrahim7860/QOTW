import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { ResponseReaction } from "./ResponseReaction";
import { useReactions } from "../context/ReactionsContext";
import { useResponses } from "../context/ResponsesContext";

export const Response = ({ user }) => {
  const navigation = useNavigation();
  const { responses, myResponse } = useResponses();
  const { reactions } = useReactions();
  const [userInput, setUserInput] = useState("");

  const goToFriendProfile = () => {
    navigation.navigate("Friend Profile", {
      fullName: user.fullName,
      username: user.username,
      isAdding: false,
    });
  };

  const handleReactionClick = (reaction) => {
    // Find the response associated with this reaction
    const associatedResponse = responses.find(
      (response) => response.id === reaction.responseId
    );

    const responseAuthor = {
      name: associatedResponse.fullName,
      username: associatedResponse.username,
      profilePic: associatedResponse.profilePicUri,
    };

    navigation.navigate("Chat", {
      conversationId: reaction.id,
      conversationName: responseAuthor.name,
      profilePic: reaction.profilePic,
      isReadOnly: true,
      senderName: reaction.name,
    });
  };

  return (
    <>
      <View style={styles.responseBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Button onPress={goToFriendProfile}>
            <Image
              source={require("../../assets/default.jpeg")}
              style={styles.profilePic}
            />
          </Button>
          <View
            style={{
              flexDirection: "column",
              padding: 10,
            }}
          >
            <Text style={styles.fullName}>{user.fullName}</Text>
            <Text style={styles.usernameStyle}>{user.username}</Text>
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
                multiline
                selectionColor={"#ababab"}
                style={styles.textInputStyle}
                onChangeText={setUserInput}
                value={userInput}
              />
            </View>

            <View style={{ justifyContent: "center" }}>
              <Button
                onPress={() => console.log("Submit Pressed")}
                disabled={!userInput.trim()}
              >
                <Image
                  source={require("../../assets/send.png")}
                  style={{ width: 25, height: 25 }}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.reactionsContainerStyle}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {reactions.map((reaction) => (
            <TouchableOpacity onPress={() => handleReactionClick(reaction)}>
              <ResponseReaction reaction={reaction} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
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
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
  },
  fullName: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
  usernameStyle: {
    color: "#ababab",
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
  reactionsContainerStyle: {
    alignSelf: "center",
    width: 350,
    marginBottom: "5%",
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
