import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useConversations} from "../context/ConversationsContext";
import {MaterialIcons} from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import {FriendChatItem} from "../components/FriendChatItem";
import {useFriends} from "../context/FriendsContext";

export const CreateChatScreen = ({navigation}) => {
    const {friends} = useFriends();

    const {conversations} = useConversations();

    const [filteredFriends, setFilteredFriends] = useState(friends);

    const filterFriends = () => {
        const filtered = friends.filter((friend) => {
            return !conversations.some(
                (conversation) => conversation.username === friend.username
            );
        });
        setFilteredFriends(filtered);
    };

    // Call filterFriends when conversations or friends change
    useEffect(() => {
        filterFriends();
    }, [conversations, friends]);

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
                <Text style={styles.headerStyle}>Create New Chat With</Text>
            </View>
            <ScrollView>
                {filteredFriends.map((item) => (
                    <FriendChatItem key={item.id.toString()} friend={item}/>
                ))}
            </ScrollView>
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
    headerStyle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
        marginVertical: 20,
        marginLeft: 10,
        marginRight: 10,
        color: "white",
        flex: 1,
    },
});
