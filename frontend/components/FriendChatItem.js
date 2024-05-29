import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import {useNavigation} from "@react-navigation/native";

export const FriendChatItem = ({friend}) => {
    const navigation = useNavigation();
    const handleOnPress = () => {
        navigation.navigate("Chats");
    };

    return (
        <View style={styles.friendItem}>
            <View style={styles.imageContainer}>
                <Image source={friend.profilePicUri} style={styles.profilePic}/>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.fullName}>{friend.fullName}</Text>
                <Text style={styles.username}>{friend.username}</Text>
            </View>
            <TouchableOpacity onPress={handleOnPress}>
                <Icon
                    name="chevron-right"
                    size={24}
                    color="white"
                    style={{marginRight: 10}}
                />
            </TouchableOpacity>
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
