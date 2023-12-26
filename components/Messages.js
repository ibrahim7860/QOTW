import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ConversationItem } from "./ConversationItem";
import { ChatScreen } from "./ChatScreen";
import { useConversations } from "./ConversationsContext";
import { MaterialIcons } from "@expo/vector-icons";

export const Messages = () => {
  const navigation = useNavigation();

  const { conversations } = useConversations();

  const handleConversationPress = (conversation) => {
    navigation.navigate("Chat", {
      conversationId: conversation.id,
      conversationName: conversation.name,
      profilePic: conversation.profilePicUri,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerStyle}>My Messages</Text>
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    marginLeft: 10,
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 10,
    color: "white",
  },
});
