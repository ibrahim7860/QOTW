import React, {useEffect, useState} from "react";

import {Alert, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {userContext} from "../context/UserContext";
import Button from "./Button";
import {useNavigation} from "@react-navigation/native";
import defaultProfilePic from "../../assets/default.jpeg";

export const UserItem = ({onSendRequest, user, currentUserId}) => {
    const [profilePic, setProfilePic] = useState(null);
    const navigation = useNavigation();
    const {getProfilePicture} = userContext();
    const fullName = `${user.firstName} ${user.lastName}`;

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfilePicture(user.userId);
            setProfilePic(url);
        };

        fetchImage();
    }, []);

    const handleSendRequestPress = () => {
        const newFriend = {
            user_1_id: currentUserId,
            user_2_id: user.userId,
            status: "pending",
        };

        Alert.alert(
            "Send Request",
            `Do you really want to send a friend request to: ${user.userId}?`,
            [
                {text: "No"},
                {
                    text: "Yes",
                    onPress: () => onSendRequest(newFriend),
                },
            ]
        );
    };

    const goToFriendProfile = () => {
        navigation.navigate("Friend Profile", {
            fullName: fullName,
            username: user.userId,
            profilePic: profilePic,
        });
    }

    return (
        <View style={styles.userItem}>
            <Button style={styles.imageContainer} onPress={goToFriendProfile}>
                <Image source={profilePic ? {uri: profilePic} : defaultProfilePic} style={styles.profilePic}/>
            </Button>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{user.userId}</Text>
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
