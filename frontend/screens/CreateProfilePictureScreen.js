import React from 'react';
import {Camera} from "expo-camera";
import {Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Shadow} from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import axios from "axios";
import {useToken} from "../context/TokenContext";
import {useResponses} from "../context/ResponsesContext";

export const CreateProfilePictureScreen = ({ navigation }) => {
    const { getToken } = useToken();
    const { globalUserId, globalFullName, updateProfilePicUri, updateFullName } = useResponses();

    const openSettings = () => {
        Linking.openSettings();
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            "Select Photo",
            "Choose where to pick your photo from",
            [
                {
                    text: "Camera",
                    onPress: updateProfilePic,
                },
                {
                    text: "Gallery",
                    onPress: updateProfilePicFromGallery,
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    const updateProfilePic = async () => {
        const status = await Camera.requestCameraPermissionsAsync();

        if (status.status !== "granted") {
            alertPermissionIssue("Camera");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        await processImageResult(result);
    };

    const updateProfilePicFromGallery = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status.status !== "granted") {
            alertPermissionIssue("Gallery");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        await processImageResult(result);
    };

    const processImageResult = async (result) => {
        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            const type = result.assets[0].type;
            const name = photoUri.split('/').pop();

            let formData = new FormData();
            formData.append('file', {
                uri: photoUri,
                name: name,
                type: type
            });

            try {
                const response = await axios.post(`http://localhost:8080/profiles/${globalUserId}/picture`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${await getToken()}`
                    },
                });
                updateProfilePicUri(photoUri);
                updateFullName(globalFullName);
                navigation.navigate("Question", { alreadyResponded: false });
            } catch (error) {
                console.error('Could not update profile picture:', error);
            }
        }
    }

    const alertPermissionIssue = (source) => {
        Alert.alert(
            `${source} Permission`,
            `${source} permission is required to access your ${source.toLowerCase()}. Please enable it in the app settings.`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: openSettings },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.uploadPictureText}>Please upload your profile picture</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={showImagePickerOptions}>
                    <View style={styles.imageContainer}>
                        <Shadow distance="10" radius="5" size="10">
                            <Image
                                source={defaultProfilePic}
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