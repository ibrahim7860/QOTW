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
import { MessageBubble } from "../components/MessageBubble";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { useConversations } from "../context/ConversationsContext";

export const ChatScreen = ({ route, navigation }) => {
  const { conversationId } = route.params;
  const { conversationName } = route.params;
  const { profilePic } = route.params;
  const { updateLastMessage } = useConversations();

  // Fetch and display messages based on conversationId
  // Replace this with your logic to fetch real messages
  const [messages, setMessages] = useState([]);

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
      updateLastMessage(conversationId, newMessage);
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
          <Image source={profilePic} style={styles.profilePic} />
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
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Button onPress={handleSend} style={{ marginTop: 5 }}>
            <Image
              source={require("../../assets/send.png")}
              style={{ width: 30, height: 30 }}
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
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "white",
    marginRight: 10,
    fontSize: 18,
  },
});
