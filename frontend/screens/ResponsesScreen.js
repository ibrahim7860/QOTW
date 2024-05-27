import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Response} from "../components/Response";
import Icon from "react-native-vector-icons/FontAwesome5";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useResponses } from "../context/ResponsesContext";
import { useReactions } from "../context/ReactionsContext";
import { MyResponse } from "../components/MyResponse";
import defaultProfilePic from "../../assets/default.jpeg";
import axios from "axios";

export const ResponsesScreen = ({ navigation }) => {
  const { responses, myResponse, globalUserId } = useResponses();
  const { reactions } = useReactions();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getProfilePicture(globalUserId);
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  const goToMessages = () => {
    navigation.navigate("Chats");
  };

  const goToUserProfile = () => {
    navigation.navigate("User Profile");
  };

  const goToFriends = () => {
    navigation.navigate("My Friends");
  };

  const goToQOTW = () => {
    navigation.push("Question", { alreadyResponded: true });
  };

  const getProfilePicture = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/profiles/${userId}/get-picture`);
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

  return (
    <View style={{ flex: 1, backgroundColor: "#291400" }}>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={goToFriends}>
              <Icon name="user-friends" size={27} color="#ababab" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }} onPress={goToQOTW}>
              <Icon name="question" size={24} color="#ababab" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerStyle}>QOTW</Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={goToMessages}>
              <Icon name="comment" size={28} color="#ababab" solid />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToUserProfile}>
              <Image
                source={imageUrl ? { uri: imageUrl } : defaultProfilePic}
                style={styles.profilePic}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        extraScrollHeight={50}
        keyboardDismissMode="on-drag"
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
      >
        <MyResponse
          myResponse={myResponse}
          reactions={reactions}
          navigation={navigation}
        />
        {responses.map((item) => (
          <Response user={item} />
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginHorizontal: 50,
  },
  topContainer: {
    backgroundColor: "#291400",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Add some padding to prevent cutting off
  },
  myBoxStyle: {
    backgroundColor: "#ababab",
    borderRadius: 20,
    padding: "5%",
    marginVertical: "3%",
    width: 350,
    alignSelf: "center",
  },
  myResponseStyle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1b0a01",
  },
  myTextStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ababab",
  },
  profilePic: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 30,
    marginLeft: 20,
  },
});
