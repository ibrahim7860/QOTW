import React, { useState } from "react";
import { Camera } from "expo-camera";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Shadow } from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import { userContext } from "../context/UserContext";

export const CreateProfilePictureScreen = ({ navigation }) => {
  const { globalUserId, globalProfilePic, setGlobalProfilePic } = userContext();
  const { getToken } = useToken();
  const [loading, setLoading] = useState(false);

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

  const processImageResult = async (result) => {
    if (!result.canceled) {
      setLoading(true); // Start loading before the upload begins
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
        navigation.navigate("Question", { alreadyResponded: false });
      } catch (error) {
        console.error("Error updating profile picture:", error);
      } finally {
        setLoading(false);
      }
    }
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
                  <ActivityIndicator size="large" color="#FFFFFF" style={styles.profilePic} />
              ) : (
                  <Image
                      source={globalProfilePic ? { uri: globalProfilePic } : defaultProfilePic}
                      style={styles.profilePic}
                  />
              )}
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
