import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, View,} from "react-native";
import Button from "./Button";
import {useNavigation} from "@react-navigation/native";
import {userContext} from "../context/UserContext";
import defaultProfilePic from "../../assets/default.jpeg";

export const Response = ({user}) => {
    const navigation = useNavigation();
    const {getProfilePicture} = userContext();
    const [profilePic, setProfilePic] = useState(null);
    const [userInput, setUserInput] = useState("");
    const fullName = `${user.firstName} ${user.lastName}`;

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfilePicture(user.userId);
            setProfilePic(url);
        };

        fetchImage();
    }, []);

    const goToFriendProfile = () => {
        navigation.navigate("Friend Profile", {
            fullName: fullName,
            username: user.userId,
            profilePic: profilePic,
        });
    };

    return (
        <>
            <View style={styles.responseBox}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 5,
                    }}
                >
                    <Button onPress={goToFriendProfile}>
                        <Image
                            source={profilePic ? {uri: profilePic} : defaultProfilePic}
                            style={styles.profilePic}
                        />
                    </Button>
                    <View
                        style={{
                            flexDirection: "column",
                            padding: 10,
                        }}
                    >
                        <Text style={styles.fullName}>{fullName}</Text>
                        <Text style={styles.usernameStyle}>{user.userId}</Text>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.responseText}>{user.responseText}</Text>
                    <View style={styles.textInputStyle}>
                        <View style={{flex: 1}}>
                            <TextInput
                                placeholder="Start a conversation"
                                placeholderTextColor="#ababab"
                                keyboardAppearance="dark"
                                multiline
                                selectionColor={"#ababab"}
                                style={styles.textInputStyle}
                                onChangeText={setUserInput}
                                value={userInput}
                            />
                        </View>

                        <View style={{justifyContent: "center"}}>
                            <Button
                                onPress={() => console.log("Submit Pressed")}
                                disabled={!userInput.trim()}
                            >
                                <Image
                                    source={require("../../assets/send.png")}
                                    style={{width: 25, height: 25}}
                                />
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    responseBox: {
        alignSelf: "center",
        padding: "2%",
        marginVertical: "3%",
    },
    responseText: {
        fontSize: 20,
        color: "white",
        fontWeight: "700",
        marginVertical: "4%",
    },
    profilePic: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 40,
    },
    fullName: {
        fontSize: 16,
        color: "white",
        fontWeight: "700",
    },
    usernameStyle: {
        color: "#ababab",
    },
    containerStyle: {
        backgroundColor: "#1b0a01",
        padding: "5%",
        paddingTop: 0,
        borderRadius: 20,
        borderColor: "#ababab",
        borderWidth: 2,
        width: 350,
    },

    textInputStyle: {
        fontSize: 14,
        color: "white",
        fontWeight: "500",
        backgroundColor: "#424140",
        borderRadius: 10,
        paddingTop: 7,
        padding: 7,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    },
});
