import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Shadow} from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import {userContext} from "../context/UserContext";
import {Image} from 'expo-image';

export const CreateProfilePictureScreen = ({navigation}) => {
    const {
        globalProfilePic,
        showImagePickerOptions,
        loading,
        setNavigate,
        setNavigation
    } = userContext();

    useEffect(() => {
        setNavigate(true);
        setNavigation(navigation);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.uploadPictureText}>
                Please upload your profile picture
            </Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={showImagePickerOptions}>
                    <View style={styles.imageContainer}>
                        <Shadow distance="10" radius="5" size="10">
                            {loading ? (
                                <ActivityIndicator
                                    size="large"
                                    color="#FFFFFF"
                                    style={styles.profilePic}
                                />
                            ) : (
                                <Image
                                    source={
                                        globalProfilePic
                                            ? {uri: globalProfilePic}
                                            : defaultProfilePic
                                    }
                                    style={styles.profilePic}
                                />
                            )}
                        </Shadow>
                        <View style={styles.iconContainer}>
                            <Icon name="camera-alt" size={35} color="#291400"/>
                        </View>
                    </View>
                </TouchableOpacity>
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
        width: 250,
        height: 250,
        borderRadius: 200,
    },
    iconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#e0e0e0",
        borderRadius: 50,
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#291400",
    },
    uploadPictureText: {
        color: "white",
        fontSize: 30,
        fontWeight: "600",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        marginVertical: "20%",
        marginHorizontal: "10%",
    },
});
