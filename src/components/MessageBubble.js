import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MessageBubble = ({ isSender, message }) => {
  const bubbleStyle = isSender ? styles.senderBubble : styles.receiverBubble;
  const textStyle = isSender ? styles.senderText : styles.receiverText;

  return (
    <View style={[styles.bubble, bubbleStyle]}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "70%",
    padding: 8,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  senderBubble: {
    backgroundColor: "#007aff", // blue color for sender
    alignSelf: "flex-end",
  },
  receiverBubble: {
    backgroundColor: "#e5e5ea", // light gray for receiver
    alignSelf: "flex-start",
  },
  senderText: {
    color: "white",
    fontSize: 18,
  },
  receiverText: {
    color: "black",
    fontSize: 18,
  },
});
