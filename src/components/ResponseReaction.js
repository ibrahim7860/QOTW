import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const ResponseReaction = ({ reaction }) => {
    return (
        <View style={styles.container}>
            <Image source={reaction.profilePic} style={styles.profileStyle} />
            <Text style={styles.usernameStyle}>
                {reaction.username}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        padding: 10,
        paddingVertical: 0,
        width: 60,
    },
    profileStyle: {
        height: 40,
        width: 40,
        alignSelf: "center",
        borderRadius: 25,
    },
    usernameStyle: {
        color: "#ababab",
        fontSize: 10,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: "center",
        maxWidth: 80, // Max width for the username to keep the container size consistent
    },
});
