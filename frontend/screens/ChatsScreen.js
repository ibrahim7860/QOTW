import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {ConversationItem} from "../components/ConversationItem";
import {useConversations} from "../context/ConversationsContext";
import {MaterialIcons} from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import {userContext} from "../context/UserContext";
import PullToRefreshScrollView from "../components/PullToRefreshScrollView";

export const ChatsScreen = ({navigation}) => {
    const {conversations, fetchMessages, fetchConversations} = useConversations();
    const {globalUserId} = userContext();
    const {getProfilePicture} = userContext();
    const [refreshing, setRefreshing] = useState(false);

    const handleConversationPress = async (conversation) => {
        const messages = await fetchMessages(conversation.chatId);
        const otherUser =
            globalUserId === conversation.participant1Id
                ? conversation.participant2Id
                : conversation.participant1Id;
        const url = await getProfilePicture(otherUser);

        navigation.navigate("Chat", {
            conversationId: conversation.chatId,
            conversationName: globalUserId,
            profilePic: url,
            senderName: otherUser,
            messages: messages,
        });
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchConversations(globalUserId);
        setRefreshing(false);
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
                <View style={styles.headerContainer}>
                    <Text style={styles.headerStyle}>My Chats</Text>
                </View>
                <View style={styles.placeholder}></View>
            </View>
            <PullToRefreshScrollView
                isRefreshing={refreshing}
                onRefresh={handleRefresh}
            >
                {conversations && conversations.length > 0 ? (
                    conversations.map((item) => (
                        <ConversationItem
                            key={item.chatId}
                            conversation={item}
                            userId={globalUserId}
                            onPress={handleConversationPress}
                        />
                    ))
                ) : (
                    <Text style={styles.noChats}>No chats</Text>
                )}
            </PullToRefreshScrollView>
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
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerStyle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        color: "white",
    },
    placeholder: {
        marginLeft: 30,
    },
    noChats: {
        fontSize: 25,
        color: "white",
        marginVertical: 10,
        marginLeft: 20,
    },
});
