import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Shadow} from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import Ripple from "react-native-material-ripple";
import CachedImage from "../components/CachedImage";

export const FriendProfileScreen = ({route, navigation}) => {
    const {fullName, username, profilePic} = route.params;

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.arrowContainer}>
                <Ripple
                    rippleColor="#fff"
                    rippleOpacity={0.9}
                    rippleSize={100}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="close" size={24} color="white"/>
                </Ripple>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Shadow distance="10" radius="5" size="10">
                        <CachedImage uri={profilePic} defaultImage={defaultProfilePic} style={styles.profilePic}/>
                    </Shadow>
                </View>
                <Text style={styles.name}>{fullName}</Text>
                <Text style={styles.username}>{username}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#291400",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    imageContainer: {
        position: "relative",
    },
    profilePic: {
        width: 170,
        height: 170,
        borderRadius: 150,
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: "white",
    },
    username: {
        fontSize: 20,
        color: "white",
        marginVertical: 10,
    },
    iconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#e0e0e0",
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#291400",
    },
    arrowContainer: {
        position: "absolute",
        top: "7%",
        left: "5%",
        zIndex: 1,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: "25%",
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        marginLeft: 10,
        color: "#291400",
        fontSize: 20,
        fontWeight: "600",
    },
});
