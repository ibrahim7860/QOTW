import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {userContext} from "../context/UserContext";
import defaultProfilePic from "../../assets/default.jpeg"

export const ConversationItem = ({conversation, userId, onPress}) => {
    const [profilePic, setProfilePic] = useState(null);
    const {getProfilePicture} = userContext();
    const otherUser = userId === conversation.participant1Id ? conversation.participant2Id : conversation.participant1Id

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfilePicture(otherUser);
            setProfilePic(url);
        };

        fetchImage();
    }, []);

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPress(conversation)}
        >
            <Image source={profilePic ? {uri: profilePic} : defaultProfilePic} style={styles.profilePic}/>
            <View style={styles.textContainer}>
                <Text
                    style={styles.name}>{otherUser}</Text>
                <Text
                    style={styles.lastMessage}>{conversation.messages[conversation.messages.length - 1].content}</Text>
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
        color: "#ababab",
        fontSize: 15,
    },
});
