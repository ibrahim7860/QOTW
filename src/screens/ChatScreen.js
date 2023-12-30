import React, {useEffect, useRef, useState} from "react";
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
import {useConversations} from "../context/ConversationsContext";

export const ChatScreen = ({ route, navigation }) => {
  const { conversationId } = route.params;
  const { conversationName } = route.params;
  const { profilePic } = route.params;
  const { updateLastMessage } = useConversations();
  const { isReadOnly } = route.params;
  const { senderName } = route.params;

  // Fetch and display messages based on conversationId
  // Replace this with your logic to fetch real messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello There",
      isSender: true,
    },
    {
      id: 2,
      text: "Woah There",
      isSender: false,
    },
    {
      id: 3,
      text: "Wassup There",
      isSender: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef();

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (!isReadOnly && newMessage.trim() !== "") {
      const newMessageObj = {
        id: `${messages.length + 1}`,
        text: newMessage,
        isSender: true,
        senderName: senderName,
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
          <Text style={styles.headerText}>{senderName}</Text>
        </View>
        <FlatList
            ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text
                style={[
                  styles.senderName,
                  item.isSender ? styles.senderRight : styles.senderLeft,
                ]}
              >
                {item.isSender ? conversationName : senderName}
              </Text>
              <MessageBubble message={item.text} isSender={item.isSender} />
            </View>
          )}
        />
        {!isReadOnly && (
          <View style={styles.inputContainer}>
            <TextInput
              selectionColor={"#ababab"}
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#ababab"
              value={newMessage}
              keyboardAppearance="dark"
              multiline
              onChangeText={(text) => setNewMessage(text)}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Button onPress={handleSend} style={{ marginTop: 5 }} disabled={!newMessage.trim()}>
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
    minHeight: 40,
    borderColor: "gray",
    borderRadius: 20,
    paddingTop: 10,
    padding: 10,
    color: "white",
    backgroundColor: "#424140",
    marginRight: 5,
    fontSize: 18,
  },
  senderName: {
    fontSize: 14,
    color: "gray",
    marginVertical: 3,
  },
  senderRight: {
    alignSelf: "flex-end",
    marginHorizontal: 15
  },
  senderLeft: {
    alignSelf: "flex-start",
    marginHorizontal: 15
  },
});
