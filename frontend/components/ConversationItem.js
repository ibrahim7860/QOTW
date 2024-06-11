import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { userContext } from "../context/UserContext";
import defaultProfilePic from "../../assets/default.jpeg";
import { MaterialIcons } from "@expo/vector-icons";
import { useToken } from "../context/TokenContext";
import { useConversations } from "../context/ConversationsContext";

export const ConversationItem = ({ conversation, userId, onPress }) => {
  const [profilePic, setProfilePic] = useState(null);
  const { getProfilePicture, globalUserId } = userContext();
  const { fetchConversations } = useConversations();
  const otherUser =
    userId === conversation.participant1Id
      ? conversation.participant2Id
      : conversation.participant1Id;
  const { getToken } = useToken();

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getProfilePicture(otherUser);
      setProfilePic(url);
    };

    fetchImage();
  }, []);

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Chat",
      `Do you really want to delete your chat with ${otherUser}?`,
      [{ text: "No" }, { text: "Yes", onPress: deleteChat }]
    );
  };

  const deleteChat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chats/${conversation.chatId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the chat");
      }

      await fetchConversations(globalUserId);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(conversation)}
    >
      <Image
        source={profilePic ? { uri: profilePic } : defaultProfilePic}
        style={styles.profilePic}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{otherUser}</Text>
        <Text style={styles.lastMessage}>
          {conversation.messages[conversation.messages.length - 1].content}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleDeletePress}
        style={styles.iconContainer}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    color: "white",
    fontSize: 20,
  },
  lastMessage: {
    color: "#ababab",
    fontSize: 15,
  },
  iconContainer: {
    padding: 10,
  },
});
