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

export const ChatScreen = ({ route, navigation }) => {
  const { conversationId } = route.params;
  const { conversationName } = route.params;
  const { profilePic } = route.params;
  const { isReadOnly } = route.params;
  const { senderName } = route.params;

  // Fetch and display messages based on conversationId
  // Replace this with your logic to fetch real messages
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hello There",
    isSender: true
  },
    {
      id: 2,
      text: "Woah There",
      isSender: false
    },
    {
      id: 3,
      text: "Wassup There",
      isSender: true
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!isReadOnly && newMessage.trim() !== "") {
      const newMessageObj = {
        id: `${messages.length + 1}`,
        text: newMessage,
        isSender: true, // Assuming the user sending the message is the sender
        senderName: senderName,
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
          <Image source={profilePic} style={styles.profilePic} />
          <Text style={styles.headerText}>{conversationName}</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View>
                <Text style={[styles.senderName, item.isSender ? styles.senderRight : styles.senderLeft]}>
                  {item.isSender ? conversationName : senderName}
                </Text>
                <MessageBubble message={item.text} isSender={item.isSender} />
              </View>
          )}
        />
        {!isReadOnly && (
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
        )}
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
  senderName: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 3,
  },
  senderRight: {
    textAlign: 'right',
    marginRight: "7%", // Adjust the margin as needed
  },
  senderLeft: {
    textAlign: 'left',
    marginLeft: "7%",
  },
});
