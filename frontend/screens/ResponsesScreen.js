import React from "react";
import {Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Response} from "../components/Response";
import Icon from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useResponses} from "../context/ResponsesContext";
import {useReactions} from "../context/ReactionsContext";
import {MyResponse} from "../components/MyResponse";
import defaultProfilePic from "../../assets/default.jpeg";
import {userContext} from "../context/UserContext";

export const ResponsesScreen = ({navigation}) => {
    const {responses, myResponse} = useResponses();
    const {globalProfilePic} = userContext();
    const {reactions} = useReactions();

    const goToMessages = () => {
        navigation.navigate("Chats");
    };

    const goToUserProfile = () => {
        navigation.navigate("User Profile");
    };

    const goToFriends = () => {
        navigation.navigate("My Friends");
    };

    const goToQOTW = () => {
        navigation.push("Question", {alreadyResponded: true});
    };

    return (
        <View style={{flex: 1, backgroundColor: "#291400"}}>
            <SafeAreaView>
                <View style={styles.topContainer}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity onPress={goToFriends}>
                            <Icon name="user-friends" size={27} color="#ababab"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 20}} onPress={goToQOTW}>
                            <Icon name="question" size={24} color="#ababab"/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.headerStyle}>QOTW</Text>

                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity onPress={goToMessages}>
                            <Icon name="comment" size={28} color="#ababab" solid/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goToUserProfile}>
                            <Image
                                source={globalProfilePic ? {uri: globalProfilePic} : defaultProfilePic}
                                style={styles.profilePic}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <KeyboardAwareScrollView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                extraScrollHeight={50}
                keyboardDismissMode="on-drag"
                enableResetScrollToCoords={false}
                showsVerticalScrollIndicator={false}
            >
                <MyResponse
                    myResponse={myResponse}
                    reactions={reactions}
                    navigation={navigation}
                />
                {responses.map((item) => (
                    <Response user={item}/>
                ))}
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        color: "white",
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
        marginHorizontal: 50,
    },
    topContainer: {
        backgroundColor: "#291400",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10, // Add some padding to prevent cutting off
    },
    myBoxStyle: {
        backgroundColor: "#ababab",
        borderRadius: 20,
        padding: "5%",
        marginVertical: "3%",
        width: 350,
        alignSelf: "center",
    },
    myResponseStyle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#1b0a01",
    },
    myTextStyle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#ababab",
    },
    profilePic: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 20,
    },
});
