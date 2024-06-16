import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {getDownloadURL, getMetadata, ref, uploadBytesResumable,} from "firebase/storage";
import {storage} from "../../firebase";
import {Alert, Linking, Platform} from "react-native";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import {useToken} from "./TokenContext";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

const UserContext = createContext();

export const userContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const {getToken} = useToken();
    const [allUsers, setAllUsers] = useState(null);
    const [globalUserId, setGlobalUserId] = useState(null);
    const [globalFullName, setGlobalFullName] = useState("");
    const [globalProfilePic, setGlobalProfilePic] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [navigation, setNavigation] = useState(null);

    const fetchAllUsers = async () => {
        axios
            .get(`http://localhost:8080/users/get-users`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getToken()}`,
                },
            })
            .then((response) => {
                setAllUsers(response.data);
            })
            .catch((error) => console.error("Error fetching users:", error));
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
                })
            ).data;
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    };

    const saveExpoPushToken = async () => {
        const token = await registerForPushNotificationsAsync();
        const payload = {
            token: token,
            userId: globalUserId,
        };

        const response = await fetch(
            "http://localhost:8080/notification/save-token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getToken()}`,
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to save push token");
        }
    };

    const fetchTokenByUserId = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/notification/get-token?recipientId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    const sendNotification = async (recipient, title, body) => {
        try {
            const expoToken = await fetchTokenByUserId(recipient);
            const notification = {
                to: expoToken,
                sound: "default",
                title: title,
                body: body,
            };

            const notificationResponse = await fetch(
                "https://exp.host/--/api/v2/push/send",
                {
                    method: "POST",
                    headers: {
                        host: "exp.host",
                        accept: "application/json",
                        "accept-encoding": "gzip, deflate",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(notification),
                }
            );
            if (!notificationResponse.ok) {
                console.error("Failed to send notification.");
            }
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    useEffect(() => {
        if (globalUserId) {
            saveExpoPushToken();
        }
    }, [globalUserId]);

    useEffect(() => {
        if (globalUserId) {
            fetchAllUsers();
        }
    }, [globalUserId]);

    useEffect(() => {
        const fetchImage = async () => {
            if (result && globalUserId) {
                await processImageResult(result);
            }
        };
        fetchImage();
    }, [result, globalUserId]);

    const processImageResult = async (result) => {
        if (!result.canceled) {
            setLoading(true);
            try {
                const uploadUrl = await uploadImageAsync(result.assets[0].uri);
                setGlobalProfilePic(uploadUrl);
                const encodedUrl = encodeURIComponent(uploadUrl);
                await axios.post(
                    `http://localhost:8080/profiles/${globalUserId}/update-picture`,
                    encodedUrl,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                if (navigate) {
                    navigation.navigate("Question", {alreadyResponded: false});
                }
            } catch (error) {
                console.error("Error updating profile picture:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshUsers = () => {
        fetchAllUsers();
    };

    const openSettings = () => {
        Linking.openSettings();
    };

    const alertPermissionIssue = (source) => {
        Alert.alert(
            `${source} Permission`,
            `${source} permission is required to access your ${source.toLowerCase()}. Please enable it in the app settings.`,
            [
                {text: "Cancel", style: "cancel"},
                {text: "OK", onPress: openSettings},
            ],
            {cancelable: false}
        );
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
            {cancelable: true}
        );
    };

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.error(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        try {
            const storageRef = ref(
                storage,
                `profile_pictures/${globalUserId}/profile.jpg`
            );
            const result = await uploadBytesResumable(storageRef, blob);

            blob.close();
            return await getDownloadURL(storageRef);
        } catch (e) {
            console.error(e);
        }
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

        setResult(result);
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

        setResult(result);
    };

    const getProfilePicture = async (userId) => {
        try {
            const storageRef = ref(storage, `profile_pictures/${userId}/profile.jpg`);
            await getMetadata(storageRef);
            const response = await axios.get(
                `http://localhost:8080/profiles/${userId}/get-picture`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
            if (response.data) {
                return decodeURIComponent(response.data.profilePicture);
            } else {
                console.error("No profile found for this user.");
                return null;
            }
        } catch (error) {
            if (error.code === "storage/object-not-found") {
                return null;
            } else {
                console.error("Error fetching profile picture:", error);
                return null;
            }
        }
    };

    return (
        <UserContext.Provider
            value={{
                allUsers,
                setAllUsers,
                globalUserId,
                setGlobalUserId,
                globalFullName,
                setGlobalFullName,
                refreshUsers,
                globalProfilePic,
                setGlobalProfilePic,
                showImagePickerOptions,
                uploadImageAsync,
                result,
                loading,
                setNavigate,
                setNavigation,
                getProfilePicture,
                sendNotification,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
