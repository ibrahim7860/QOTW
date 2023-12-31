import React from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View,} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ConversationItem} from "../components/ConversationItem";
import {useConversations} from "../context/ConversationsContext";
import {MaterialIcons} from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import {useResponses} from "../context/ResponsesContext";

export const MessagesScreen = () => {
  const navigation = useNavigation();
  const { conversations } = useConversations();
  const { responses, myResponse } = useResponses();

  const handleConversationPress = (conversation) => {
    navigation.navigate("Chat", {
      conversationId: conversation.id,
      conversationName: myResponse.fullName,
      profilePic: conversation.profilePicUri,
      senderName: conversation.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ripple
          rippleColor="#fff"
          rippleOpacity={0.9}
          rippleSize={100}
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Ripple>
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
