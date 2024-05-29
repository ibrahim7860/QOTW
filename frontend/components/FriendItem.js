import React from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const FriendItem = ({
                               friend,
                               onRemove,
                               onSendRequest,
                               onAcceptRequest,
                               onRejectRequest,
                               onCancelRequest,
                               isIncomingRequest,
                               isSentRequest,
                               isFriend,
                               currentUserId,
                           }) => {
    const friendUserID =
        friend.user_2_id !== currentUserId ? friend.user_2_id : friend.user_1_id;

    const handleRemovePress = () => {
        Alert.alert(
            "Remove Friend",
            `Do you really want to remove ${friendUserID} as a friend?`,
            [{text: "No"}, {text: "Yes", onPress: () => onRemove(friend.id)}]
        );
    };
    const handleAcceptPress = () => {
        Alert.alert(
            "Accept Request",
            `Do you really want to accept ${friendUserID}'s friend request?`,
            [
                {text: "No"},
                {text: "Yes", onPress: () => onAcceptRequest(friend.id)},
            ]
        );
    };
    const handleRejectPress = () => {
        Alert.alert(
            "Remove Request",
            `Do you really want to reject ${friendUserID}'s friend request?`,
            [
                {text: "No"},
                {text: "Yes", onPress: () => onRejectRequest(friend.id)},
            ]
        );
    };

    const handleCancelPress = () => {
        Alert.alert(
            "Cancel Request",
            `Do you really want to cancel the friend request to: ${friendUserID}?`,
            [
                {text: "No"},
                {text: "Yes", onPress: () => onCancelRequest(friend.id)},
            ]
        );
    };

    const handleSendRequestPress = () => {
        Alert.alert(
            "Send Request",
            `Do you really want to send a friend request to: ${friendUserID}?`,
            [{text: "No"}, {text: "Yes", onPress: () => onSendRequest(friend.id)}]
        );
    };

    return (
        <View style={styles.friendItem}>
            <View style={styles.imageContainer}>
                <Image source={friend.profilePicUri} style={styles.profilePic}/>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.username}>{friendUserID}</Text>
            </View>
            {isIncomingRequest ? (
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={handleAcceptPress}>
                        <Icon
                            name="check"
                            size={24}
                            color="white"
                            style={{marginRight: 10}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRejectPress}>
                        <Icon
                            name="close"
                            size={24}
                            color="white"
                            style={{marginRight: 10}}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {isSentRequest && (
                        <TouchableOpacity onPress={handleCancelPress}>
                            <Icon
                                name="cancel"
                                size={24}
                                color="white"
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                    )}

                    {isFriend && (
                        <TouchableOpacity onPress={handleRemovePress}>
                            <Icon
                                name="delete"
                                size={24}
                                color="white"
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    friendItem: {
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
    friendInfo: {
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
