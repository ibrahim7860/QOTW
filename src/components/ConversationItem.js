import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export const ConversationItem = ({ conversation, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(conversation)}
    >
      <Image source={conversation.profilePicUri} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{conversation.name}</Text>
        <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
      </View>
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
    color: "white",
    fontSize: 15,
  },
  // ... other styles ...
});
