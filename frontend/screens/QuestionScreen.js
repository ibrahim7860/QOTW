import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { useResponses } from "../context/ResponsesContext";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import { userContext } from "../context/UserContext";
import { useQuestion } from "../context/QuestionContext";
import { useFriends } from "../context/FriendsContext";
import { Image } from "expo-image";

export const QuestionScreen = ({ route, navigation }) => {
  const { alreadyResponded } = route.params;
  const { setResponseSubmitted, refreshResponses } = useResponses();
  const [userInput, setUserInput] = useState("");
  const { questionText, questionId } = useQuestion();
  const { friends } = useFriends();

  const { getToken } = useToken();

  const { globalUserId, sendNotification } = userContext();

  const responseDto = {
    userId: globalUserId,
    questionId: questionId,
    responseText: userInput,
  };

  const handleSubmit = async () => {
    axios
      .post("http://localhost:8080/response/create-response", responseDto, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(async (response) => {
        setResponseSubmitted(true);
        await refreshResponses();
        navigation.navigate("Responses");
        for (let friend of friends) {
          const friendUserID =
            friend.user_2_id !== globalUserId
              ? friend.user_2_id
              : friend.user_1_id;
          await sendNotification(
            friendUserID,
            "New response!",
            globalUserId + " has responded to the question of the week!"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {alreadyResponded && (
        <View style={styles.iconContainer}>
          <Ripple
            rippleColor="#fff"
            rippleOpacity={0.9}
            rippleSize={100}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </Ripple>
        </View>
      )}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Text
          style={styles.qotwStyle}
        >{`Week ${questionId}: ${questionText}`}</Text>
      </ScrollView>

      {!alreadyResponded && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ marginVertical: 10 }}
          extraScrollHeight={50}
        >
          <View style={styles.textInputStyle}>
            <View style={{ flex: 1 }}>
              <TextInput
                multiline
                placeholder="Your response..."
                placeholderTextColor="#ababab"
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                style={styles.textInputStyle}
                onChangeText={setUserInput}
                value={userInput}
              />
            </View>

            <View style={{ padding: 5 }}>
              <Button onPress={handleSubmit} disabled={!userInput.trim()}>
                <Image
                  source={require("../../assets/send.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#291400",
  },
  iconContainer: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
    alignItems: "flex-end",
  },
  qotwStyle: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  textInputStyle: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
    fontWeight: "500",
    paddingTop: 6,
    paddingLeft: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#424140",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
  },
});
