import React from "react";

import {Alert, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const UserItem = ({onSendRequest, user, currentUserId}) => {
    const handleSendRequestPress = () => {
        const newFriend = {
            user_1_id: currentUserId,
            user_2_id: user,
            status: "pending",
        };

        console.log(newFriend);

        Alert.alert(
            "Send Request",
            `Do you really want to send a friend request to: ${user}?`,
            [
                {text: "No"},
                {
                    text: "Yes",
                    onPress: () => onSendRequest(newFriend),
                },
            ]
        );
    };

    return (
        <View style={styles.userItem}>
            <View style={styles.imageContainer}>
                <Image source={user.profilePicUri} style={styles.profilePic}/>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{user}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={handleSendRequestPress}>
                    <Icon
                        name="check"
                        size={24}
                        color="white"
                        style={{marginRight: 10}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageContainer: {
        padding: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    fullName: {
        fontWeight: "700",
        color: "white",
        fontSize: 20,
    },
    username: {
        color: "white",
        fontSize: 15,
    },
});
