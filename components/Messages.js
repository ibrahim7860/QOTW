import React, { useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ConversationItem } from "./ConversationItem";
import { ChatScreen } from "./ChatScreen";
import defaultProfilePic from "../assets/default.jpeg";

export const Messages = () => {
  const navigation = useNavigation();

  const [conversations, setConversations] = useState([
    // Placeholder data
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      profilePicUri: defaultProfilePic,
    },
    {
      id: "2",
      name: "Nayeem Belal",
      lastMessage: "Wassup, how are you?",
      profilePicUri: defaultProfilePic,
    },
  ]);

  const handleConversationPress = (conversation) => {
    navigation.navigate("Chat", {
      conversationId: conversation.id,
      conversationName: conversation.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerStyle}>My Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={handleConversationPress}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
