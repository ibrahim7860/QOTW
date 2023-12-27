import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const ResponseReaction = ({ reaction }) => {
    return (
        <View
            style={{
                alignContent: "center",
                padding: 10,
                paddingVertical: 0,
                width: "100%",
            }}
        >
            <Image
                source={reaction.profilePic}
                style={{ height: 40, width: 40, alignSelf: "center", borderRadius: 25 }}
            />
            <Text style={styles.usernameStyle}>{reaction.username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    usernameStyle: {
        color: "white",
        fontSize: 10,
        margin: 5,
        fontWeight: "500",
        textAlign: "center",
    },
});