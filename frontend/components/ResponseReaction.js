import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export const ResponseReaction = ({reaction}) => {
    return (
        <View style={styles.container}>
            <Image source={reaction.profilePic} style={styles.profileStyle}/>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.usernameStyle}>
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
        maxWidth: 85,
    },
    profileStyle: {
        height: 55,
        width: 55,
        alignSelf: "center",
        borderRadius: 50,
    },
    usernameStyle: {
        color: "#ababab",

        fontSize: 12,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: "center",
    },
});
