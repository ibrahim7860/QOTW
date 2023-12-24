import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { MessageBubble } from "./MessageBubble";
import Button from "./Button";
import { MaterialIcons } from "@expo/vector-icons";

export const ChatScreen = ({ route, navigation }) => {
  const { conversationId } = route.params;
  const { conversationName } = route.params;

  // Fetch and display messages based on conversationId
  // Replace this with your logic to fetch real messages
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi there!", isSender: true },
    { id: "2", text: "Hello! How are you?", isSender: false },
    // ... more messages
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: `${messages.length + 1}`,
        text: newMessage,
        isSender: true, // Assuming the user sending the message is the sender
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{conversationName}</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item.text} isSender={item.isSender} />
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="white"
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <Button onPress={handleSend}>
            <Image
              source={require("../assets/send.png")}
              style={{ width: 25, height: 25 }}
            />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#291400",
  },
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#291400",
    marginVertical: 10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
    marginRight: 10,
    fontSize: 18,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#291400",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
  },
});
