import React, {useEffect, useRef, useState} from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {MessageBubble} from "../components/MessageBubble";
import Button from "../components/Button";
import {MaterialIcons} from "@expo/vector-icons";
import {useConversations} from "../context/ConversationsContext";
import * as Animatable from 'react-native-animatable';
import {useToken} from "../context/TokenContext";


export const ChatScreen = ({route, navigation}) => {
    const {conversationId} = route.params;
    const {conversationName} = route.params;
    const {profilePic} = route.params;
    const {fetchConversations} = useConversations();
    const {isReadOnly} = route.params;
    const {senderName} = route.params;
    const {messages} = route.params;
    const [updatedMessages, setUpdatedMessages] = useState(messages);
    const {getToken} = useToken();

    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef();

    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({animated: true});
            }, 500);
        }
    }, [updatedMessages]);

    const handleGoBack = async () => {
        await fetchConversations(conversationName);
        navigation.goBack();
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/messages/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getToken()}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const messagesData = await response.json();
            setUpdatedMessages(messagesData);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSend = async () => {
        if (!isReadOnly && newMessage.trim() !== "") {
            const newMessageObj = {
                chatId: conversationId,
                senderId: conversationName,
                content: newMessage,
            };

            try {
                const response = await fetch('http://localhost:8080/chats/message/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getToken()}`,
                    },
                    body: JSON.stringify(newMessageObj)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                await fetchMessages();
                setNewMessage("");
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back" size={24} color="white"/>
                    </TouchableOpacity>
                    <Image source={{uri: profilePic}} style={styles.profilePic}/>
                    <Text style={styles.headerText}>{senderName}</Text>
                </View>
                <FlatList
                    ref={flatListRef}
                    data={updatedMessages}
                    keyExtractor={(item) => item.messageId}
                    ListFooterComponent={<View style={{height: 15}}/>}
                    renderItem={({item}) => (
                        <View>
                            <Text
                                style={[
                                    styles.senderName,
                                    item.senderId === conversationName ? styles.senderRight : styles.senderLeft,
                                ]}
                            >
                                {item.senderId === conversationName ? conversationName : senderName}
                            </Text>
                            <Animatable.View animation={item.animation} duration={450}>
                                <MessageBubble message={item.content}
                                               isSender={item.senderId === conversationName}/>
                            </Animatable.View>
                        </View>
                    )}
                />
                {!isReadOnly && (
                    <View style={styles.textInputStyle}>
                        <View style={{flex: 1}}>
                            <TextInput
                                selectionColor={"#ababab"}
                                style={styles.textInputStyle}
                                placeholder="Message"
                                placeholderTextColor="#ababab"
                                value={newMessage}
                                keyboardAppearance="dark"
                                multiline
                                onChangeText={(text) => setNewMessage(text)}
                                onSubmitEditing={handleSend}
                                returnKeyType="send"
                            />
                        </View>

                        <View style={{padding: 3, paddingTop: 0}}>
                            <Button onPress={handleSend} disabled={!newMessage.trim()}>
                                <Image
                                    source={require("../../assets/send.png")}
                                    style={{width: 30, height: 30}}
                                />
                            </Button>
                        </View>
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
    textInputStyle: {
        fontSize: 16,
        marginBottom: 10,
        color: "white",
        fontWeight: "500",
        paddingTop: 6,
        paddingLeft: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#424140",
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: "center",
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
        marginHorizontal: 15,
    },
    senderLeft: {
        alignSelf: "flex-start",
        marginHorizontal: 15,
    },
});
