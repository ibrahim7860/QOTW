import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import defaultProfilePic from "../../assets/default.jpeg";

import { userContext } from "../context/UserContext";
import { useToken } from "../context/TokenContext";

export const ReactionItem = ({ reaction, responseUserId, navigation }) => {
  const { getProfilePicture } = userContext();
  const [profilePic, setProfilePic] = useState(null);
  const [reactorUserId, setReactorUserId] = useState(null);
  const [messages, setMessages] = useState(null);
  const { getToken } = useToken();

  if (!reaction || !responseUserId) {
    return null;
  }

  // Destructure properties from reaction
  const { chatId, participant1Id, participant2Id } = reaction;

  const fetchReactionMessages = async () => {
    try {
      console.log("IN FETCH MESSAGES");
      const response = await fetch(`http://localhost:8080/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const userId =
      participant1Id === responseUserId ? participant2Id : participant1Id;
    setReactorUserId(userId);
  }, [reaction, responseUserId]);

  const onReactionPress = async () => {
    console.log("REACTION PRESSED", reactorUserId);
    await fetchReactionMessages();
    console.log("MESSAGES", messages);

    navigation.navigate("Chat", {
      conversationId: chatId,
      conversationName: reactorUserId,
      senderName: responseUserId,
      messages: messages,
      isReadOnly: true,
    });
  };

  const fetchImage = async () => {
    const url = await getProfilePicture(reactorUserId);
    setProfilePic(url);
  };

  useEffect(() => {
    if (reactorUserId) {
      fetchImage();
    }
  }, [reactorUserId]);

  return (
    <TouchableOpacity onPress={onReactionPress} style={styles.container}>
      <View>
        <Image
          source={profilePic ? { uri: profilePic } : defaultProfilePic}
          style={styles.profilePic}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.usernameStyle}
        >
          {reactorUserId}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 0,
    maxWidth: 85,
  },
  usernameStyle: {
    color: "#ababab",
    fontSize: 12,
    marginVertical: 5,
    fontWeight: "500",
    textAlign: "center",
  },
  profilePic: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    marginLeft: 20,
  },
});
