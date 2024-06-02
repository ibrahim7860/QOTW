import React from "react";
import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";

export const MyResponse = ({myResponse, reactions, navigation}) => {
    const handleReactionClick = (reaction) => {
        navigation.navigate("Chat", {
            conversationId: reaction.id,
            conversationName: myResponse.fullName,
            profilePic: reaction.profilePic,
            isReadOnly: true,
            senderName: reaction.name,
        });
    };

    return (
        <TouchableOpacity>
            <View style={{alignItems: "center", marginTop: 10}}>
                <Text style={styles.myTextStyle}>Your Response</Text>
            </View>
            <View style={styles.myBoxStyle}>
                <Text style={styles.myResponseStyle}>{myResponse.responseText}</Text>
            </View>
            <View style={styles.reactionsContainerStyle}>
                {/*<ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
                {/*    {reactions.map((reaction) => (*/}
                {/*        <TouchableOpacity onPress={() => handleReactionClick(reaction)}>*/}
                {/*            <ResponseReaction reaction={reaction}/>*/}
                {/*        </TouchableOpacity>*/}
                {/*    ))}*/}
                {/*</ScrollView>*/}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    myBoxStyle: {
        backgroundColor: "#ababab",
        borderRadius: 20,
        padding: "5%",
        marginVertical: "3%",
        width: 350,
        alignSelf: "center",
    },
    myResponseStyle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1b0a01",
    },
    myTextStyle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#ababab",
    },
    reactionsContainerStyle: {
        alignSelf: "center",
        width: 350,
        marginBottom: "5%",
        marginTop: "2%",
    },
});