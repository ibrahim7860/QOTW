import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Shadow } from "react-native-shadow-2";
import defaultProfilePic from "../../assets/default.jpeg";
import Ripple from "react-native-material-ripple";

export const UserProfileScreen = ({ route, navigation }) => {
  const { fullName, username } = route.params;
  const [profilePic, setProfilePic] = useState(null);

  const updateProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleArrowClick = () => {
    navigation.navigate("Responses");
  };

  const handleLogout = () => {
    navigation.navigate("Welcome Screen")
  }

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
        <TouchableOpacity onPress={updateProfilePic}>
          <View style={styles.imageContainer}>
            <Shadow distance="10" radius="5" size="10">
              <Image
                source={profilePic ? { uri: profilePic } : defaultProfilePic}
                style={styles.profilePic}
              />
            </Shadow>
            <View style={styles.iconContainer}>
              <Icon name="camera-alt" size={19} color="#291400" />
            </View>
          </View>
        </TouchableOpacity>
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
  settingsContainer: {
    position: "absolute",
    top: "7%",
    right: "5%",
    zIndex: 1,
  },
});
