import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const FriendItem = ({ friend, onRemove }) => {
  const handleRemovePress = () => {
    Alert.alert(
      "Remove Friend",
      `Do you really want to remove ${friend.username} as a friend?`,
      [{ text: "No" }, { text: "Yes", onPress: () => onRemove(friend.id) }]
    );
  };

  return (
    <View style={styles.friendItem}>
      <View style={styles.imageContainer}>
        <Image source={friend.profilePicUri} style={styles.profilePic} />
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.fullName}>{friend.fullName}</Text>
        <Text style={styles.username}>{friend.username}</Text>
      </View>
      <TouchableOpacity onPress={handleRemovePress}>
        <Icon
          name="close"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  fullName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  username: {
    color: "white",
    fontSize: 15,
  },
});
