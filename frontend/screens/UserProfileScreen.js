import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Shadow } from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import Ripple from "react-native-material-ripple";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useResponses } from "../context/ResponsesContext";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { userContext } from "../context/UserContext";

export const UserProfileScreen = ({ navigation }) => {
  const { globalUserId, globalFullName } = userContext();
  const [image, setImage] = useState(null);
  const { getToken } = useToken();

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getProfilePicture(globalUserId);
      setImage(url);
    };

    fetchImage();
  }, []);

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
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
      const encodedUrl = encodeURIComponent(uploadUrl);
      axios
        .post(
          `http://localhost:8080/profiles/${globalUserId}/update-picture`,
          encodedUrl
        )
        .then((response) => {
          setImage(uploadUrl);
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
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

  const getProfilePicture = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/profiles/${userId}/get-picture`
      );
      if (response.data) {
        return decodeURIComponent(response.data.profilePicture);
      } else {
        console.error("No profile found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  };

  const handleArrowClick = () => {
    navigation.navigate("Responses");
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      axios
        .post(
          "http://localhost:8080/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log("Logged out successfully");
        })
        .catch((error) => {
          console.error("Failed to logout:", error);
        });
    }

    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Welcome Screen");
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.arrowContainer}>
        <Ripple
          rippleColor="#fff"
          rippleOpacity={0.9}
          rippleSize={100}
          onPress={handleArrowClick}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </Ripple>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsContainer}>
        <Ripple
          rippleColor="#fff"
          rippleOpacity={0.9}
          rippleSize={100}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color="white" />
        </Ripple>
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity onPress={showImagePickerOptions}>
          <View style={styles.imageContainer}>
            <Shadow distance="10" radius="5" size="10">
              <Image
                source={image ? { uri: image } : defaultProfilePic}
                style={styles.profilePic}
              />
            </Shadow>
            <View style={styles.iconContainer}>
              <Icon name="camera-alt" size={19} color="#291400" />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{globalFullName}</Text>
        <Text style={styles.username}>{globalUserId}</Text>
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
  settingsContainer: {
    position: "absolute",
    top: "7%",
    right: "5%",
    zIndex: 1,
  },
});
