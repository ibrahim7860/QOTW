import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Shadow } from "react-native-shadow-2";

export const UserProfile = ({ firstName, lastName, username }) => {
  const [profilePic, setProfilePic] = useState(null);

  const updateProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={updateProfilePic}>
        <View style={styles.imageContainer}>
          <Shadow distance="10" radius="5" size="10">
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          </Shadow>
          <View style={styles.iconContainer}>
            <Icon name="camera-alt" size={27} color="#291400" />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 150,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  username: {
    fontSize: 23,
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#291400",
  },
});
