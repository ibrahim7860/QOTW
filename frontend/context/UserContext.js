import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {Alert, Linking} from "react-native";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const UserContext = createContext();

export const userContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [allUsers, setAllUsers] = useState(null);
    const [globalUserId, setGlobalUserId] = useState(null);
    const [globalFullName, setGlobalFullName] = useState("");
    const [globalProfilePic, setGlobalProfilePic] = useState(null);
    const [result, setResult] = useState(null);

    const fetchAllUsers = () => {
        axios
            .get(`http://localhost:8080/users/`)
            .then((response) => setAllUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

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
                console.log(e);
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
            console.log(e);
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
