import React, {useEffect, useState} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {userContext} from "../context/UserContext";
import defaultProfilePic from "../../assets/default.jpeg";
import Button from "./Button";
import {useNavigation} from "@react-navigation/native";

export const FriendItem = ({
                               friend,
                               onRemove,
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
    const [profilePic, setProfilePic] = useState(null);
    const {getProfilePicture, allUsers} = userContext();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfilePicture(friendUserID);
            setProfilePic(url);
        };

        fetchImage();
    }, []);

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

    const goToFriendProfile = () => {
        const user = allUsers.find(user => user.userId === friendUserID);
        navigation.navigate("Friend Profile", {
            fullName: `${user.firstName} ${user.lastName}`,
            username: friendUserID,
            profilePic: profilePic,
        });
    }

    return (
        <View style={styles.friendItem}>
            <Button style={styles.imageContainer} onPress={goToFriendProfile}>
                <Image source={profilePic ? {uri: profilePic} : defaultProfilePic} style={styles.profilePic}/>
            </Button>
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
