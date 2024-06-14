import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import Button from "./Button";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {userContext} from "../context/UserContext";
import defaultProfilePic from "../../assets/default.jpeg";
import {useToken} from "../context/TokenContext";
import {ReactionItem} from "./ReactionItem";
import {Image} from 'expo-image';

export const Response = ({user}) => {
    const navigation = useNavigation();
    const {getProfilePicture, globalUserId, sendNotification} = userContext();
    const [profilePic, setProfilePic] = useState(null);
    const [hasExistingConversation, setHasExistingConversation] = useState(false);
    const [userInput, setUserInput] = useState("");
    const fullName = `${user.firstName} ${user.lastName}`;
    const {getToken} = useToken();
    const [chatThatExists, setChatThatExists] = useState(null);
    const [reactions, setReactions] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfilePicture(user.userId);
            setProfilePic(url);
        };

        fetchImage();
        checkConversation();
        getReactions();
    }, []);

    const getReactions = async () => {
        const response = await fetch(
            `http://localhost:8080/response/${user.userId}/get-reactions`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getToken()}`,
                },
            }
        );

        if (!response.ok) {
            // Handle error, for example throw an error or log it
            throw new Error("Failed to fetch reactions");
        }

        const responseData = await response.json();

        const filteredReactions = responseData.filter(
            (reaction) =>
                reaction.participant1Id !== globalUserId &&
                reaction.participant2Id !== globalUserId
        );

        const reactionsWithoutMessages = filteredReactions.map((reaction) => {
            const {messages, ...rest} = reaction;
            return rest;
        });

        setReactions(reactionsWithoutMessages);
    };

    const checkConversation = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/chats/checkConversation/${globalUserId}/${user.userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );

            if (response.status === 204) {
                setHasExistingConversation(false);
            } else if (response.ok) {
                const chat = await response.json();
                setHasExistingConversation(true);
                setChatThatExists(chat);
            } else {
                console.error("Failed to fetch conversation");
            }
        } catch (error) {
            console.error("Error checking conversation:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            checkConversation();
        }, [])
    );

    const goToFriendProfile = () => {
        navigation.navigate("Friend Profile", {
            fullName: fullName,
            username: user.userId,
            profilePic: profilePic,
        });
    };

    const handleStartChat = async () => {
        try {
            const response = await fetch("http://localhost:8080/chats/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getToken()}`,
                },
                body: JSON.stringify({
                    initiatorId: globalUserId,
                    responderId: user.userId,
                    senderId: globalUserId,
                    messageContent: userInput,
                }),
            });

            if (!response.ok) {
                console.error("Failed to start chat");
            }

            const chatData = await response.json();
            setChatThatExists(chatData);
            setHasExistingConversation(true);

            navigation.navigate("Chat", {
                conversationId: chatData.chatId,
                conversationName: globalUserId,
                profilePic: profilePic,
                senderName: user.userId,
                messages: chatData.messages,
            });

            await sendNotification(
                user.userId,
                "New Message",
                "You have a new message from " + globalUserId
            );

            setUserInput("");
        } catch (error) {
            console.error("Error starting chat:", error);
        }
    };

    return (
        <>
            <View style={styles.responseBox}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 5,
                    }}
                >
                    <Button onPress={goToFriendProfile}>
                        <Image
                            source={profilePic ? {uri: profilePic} : defaultProfilePic}
                            style={styles.profilePic}
                        />
                    </Button>
                    <View
                        style={{
                            flexDirection: "column",
                            padding: 10,
                        }}
                    >
                        <Text style={styles.fullName}>{fullName}</Text>
                        <Text style={styles.usernameStyle}>{user.userId}</Text>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.responseText}>{user.responseText}</Text>
                    {hasExistingConversation ? (
                        <Button
                            onPress={() =>
                                navigation.navigate("Chat", {
                                    conversationId: chatThatExists.chatId,
                                    conversationName: globalUserId,
                                    profilePic: profilePic,
                                    senderName: user.userId,
                                    messages: chatThatExists.messages,
                                })
                            }
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.buttonText}>Go to Conversation</Text>
                        </Button>
                    ) : (
                        <View style={styles.textInputStyle}>
                            <View style={{flex: 1}}>
                                <TextInput
                                    placeholder="Start a conversation"
                                    placeholderTextColor="#ababab"
                                    keyboardAppearance="dark"
                                    multiline
                                    selectionColor={"#ababab"}
                                    style={styles.textInputStyle}
                                    onChangeText={setUserInput}
                                    value={userInput}
                                />
                            </View>
                            <View style={{justifyContent: "center"}}>
                                <Button onPress={handleStartChat} disabled={!userInput.trim()}>
                                    <Image
                                        source={require("../../assets/send.png")}
                                        style={{width: 25, height: 25}}
                                    />
                                </Button>
                            </View>
                        </View>
                    )}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.reactionsContainerStyle}>
                        {reactions &&
                            reactions.map((reaction) => (
                                <ReactionItem
                                    reaction={reaction}
                                    key={reaction.chatId}
                                    responseUserId={user.userId}
                                    navigation={navigation}
                                />
                            ))}
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    responseBox: {
        alignSelf: "center",
        padding: "2%",
        marginVertical: "3%",
    },
    responseText: {
        fontSize: 20,
        color: "white",
        fontWeight: "700",
        marginVertical: "4%",
    },
    profilePic: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 40,
    },
    fullName: {
        fontSize: 16,
        color: "white",
        fontWeight: "700",
    },
    usernameStyle: {
        color: "#ababab",
    },
    containerStyle: {
        backgroundColor: "#1b0a01",
        padding: "5%",
        paddingTop: 0,
        borderRadius: 20,
        borderColor: "#ababab",
        borderWidth: 1,
        width: 350,
    },

    textInputStyle: {
        fontSize: 14,
        color: "white",
        fontWeight: "500",
        backgroundColor: "#424140",
        borderRadius: 10,
        paddingTop: 7,
        padding: 7,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    buttonStyle: {
        fontSize: 14,
        backgroundColor: "#424140",
        borderRadius: 10,
        paddingVertical: 7, // Adjusted for button context
        paddingHorizontal: 7,
        flexDirection: "row",
        alignItems: "center", // Center items inside the button
        justifyContent: "center",
        height: 50, // Specify height to ensure adequate touch area
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
    },
    reactionsContainerStyle: {
        flexDirection: 'row',
        paddingHorizontal: 0,
        alignItems: 'center', // Center items vertically.
        justifyContent: 'flex-start', // Align items to the start of the row.
        width: 350,
    },
});
