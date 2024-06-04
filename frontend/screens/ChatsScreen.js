import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {ConversationItem} from "../components/ConversationItem";
import {useConversations} from "../context/ConversationsContext";
import {MaterialIcons} from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import {useResponses} from "../context/ResponsesContext";
import {userContext} from "../context/UserContext";

export const ChatsScreen = ({navigation}) => {
    const {conversations} = useConversations();
    const {responses} = useResponses();
    const {globalUserId} = userContext();
    const [profilePic, setProfilePic] = useState(null);
    const {getProfilePicture} = userContext();


    const handleConversationPress = async (conversation) => {
        const otherUser = globalUserId === conversation.participant1Id ? conversation.participant2Id : conversation.participant1Id
        const url = await getProfilePicture(otherUser);

        navigation.navigate("Chat", {
            conversationId: conversation.chatId,
            conversationName: globalUserId,
            profilePic: url,
            senderName: otherUser,
            messages: conversation.messages,
        });
    };

    const handleNewChatPress = () => {
        navigation.navigate("Create Chat");
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
                    <MaterialIcons name="arrow-back" size={24} color="white"/>
                </Ripple>
                <Text style={styles.headerStyle}>My Chats</Text>
                <Ripple
                    rippleColor="#fff"
                    rippleOpacity={0.9}
                    rippleSize={100}
                    onPress={handleNewChatPress}
                    style={styles.newChat}
                >
                    <MaterialIcons name="edit" size={24} color="white"/>
                </Ripple>
            </View>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.chatId}
                renderItem={({item}) => (
                    <ConversationItem
                        conversation={item}
                        userId={globalUserId}
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
        justifyContent: "space-between",
        alignItems: "center",
    },
    backArrow: {
        marginLeft: 15,
    },
    newChat: {
        marginRight: 15,
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
