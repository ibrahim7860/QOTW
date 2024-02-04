import React, {useState} from 'react';
import {Camera} from "expo-camera";
import {Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Shadow} from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";

export const CreateProfilePictureScreen = ({ navigation }) => {
    const [profilePic, setProfilePic] = useState(null);

    const checkAndRequestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        return status;
    };
    const openSettings = () => {
        Linking.openSettings();
    };

    const updateProfilePic = async () => {
        const status = await checkAndRequestCameraPermission();

        if (status !== "granted") {
            Alert.alert(
                "Camera Permission",
                "Camera permission is required to take pictures. Please enable it in the app settings.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: openSettings },
                ],
                { cancelable: false }
            );
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
            navigation.navigate("Question", { alreadyResponded: false });
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.uploadPictureText}>Please upload your profile picture</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={updateProfilePic}>
                    <View style={styles.imageContainer}>
                        <Shadow distance="10" radius="5" size="10">
                            <Image
                                source={profilePic ? { uri: profilePic } : defaultProfilePic}
                                style={styles.profilePic}
                            />
                        </Shadow>
                        <View style={styles.iconContainer}>
                            <Icon name="camera-alt" size={35} color="#291400" />
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
        color: 'white',
        fontSize: 30,
        fontWeight: "600",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        marginVertical: '20%',
        marginHorizontal: '10%'
    }
});