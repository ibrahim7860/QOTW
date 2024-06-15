import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import defaultProfilePic from "../../assets/default.jpeg";

import {userContext} from "../context/UserContext";
import {useConversations} from "../context/ConversationsContext";
import CachedImage from "./CachedImage";

export const ReactionItem = ({reaction, responseUserId, navigation}) => {
    const {getProfilePicture} = userContext();
    const [profilePic, setProfilePic] = useState(null);
    const [reactorUserId, setReactorUserId] = useState(null);
    const [otherUserId, setOtherUserId] = useState(null);
    const [otherProfilePic, setOtherProfilePic] = useState(null);
    const {fetchReactionMessages} = useConversations();

    if (!reaction || !responseUserId) {
        return null;
    }

    const {chatId, participant1Id, participant2Id} = reaction;

    useEffect(() => {
        const userId =
            participant1Id === responseUserId ? participant2Id : participant1Id;
        const otherUserId = participant1Id === responseUserId ? participant1Id : participant2Id;
        setReactorUserId(userId);
        setOtherUserId(otherUserId);
    }, [reaction, responseUserId]);

    const onReactionPress = async () => {
        const messages = await fetchReactionMessages(chatId);

        navigation.navigate("Chat", {
            conversationId: chatId,
            conversationName: reactorUserId,
            senderName: responseUserId,
            messages: messages,
            isReadOnly: true,
            profilePic: otherProfilePic
        });
    };

    const fetchImages = async () => {
        const url = await getProfilePicture(reactorUserId);
        setProfilePic(url);
        const otherUrl = await getProfilePicture(otherUserId);
        setOtherProfilePic(otherUrl);
    };

    useEffect(() => {
        if (reactorUserId && otherUserId) {
            fetchImages();
        }
    }, [reactorUserId, otherUserId]);

    return (
        <TouchableOpacity onPress={onReactionPress} style={styles.container}>
            <View style={styles.profileContainer}>
                <CachedImage
                    uri={profilePic}
                    defaultImage={defaultProfilePic}
                    style={styles.profilePic}
                />
                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.usernameStyle}
                >
                    {reactorUserId}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        maxWidth: 85,
        marginTop: 15,
    },
    profileContainer: {
        alignItems: "center",
        width: 65,
    },
    usernameStyle: {
        color: "#ababab",
        fontSize: 13,
        marginTop: 5,
        fontWeight: "500",
        textAlign: "center",
    },
    profilePic: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: 20,
    },
});
