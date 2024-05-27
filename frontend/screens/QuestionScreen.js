import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { useResponses } from "../context/ResponsesContext";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const QuestionScreen = ({ route, navigation }) => {
  const { alreadyResponded } = route.params;
  const {
    setResponseSubmitted,
    globalUserId,
    responseSubmitted,
    setMyResponse,
  } = useResponses();
  const [userInput, setUserInput] = useState("");
  const [questionText, setQuestionText] = useState("");
  const questionId = 1;
  const { getToken } = useToken();

  useEffect(() => {
    const fetchQuestion = async () => {
      axios
        .get(`http://192.168.200.128:8080/question/${questionId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((response) => {
          setQuestionText(response.data.questionText);
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
        });
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    if (responseSubmitted) {
      const fetchUserResponse = async () => {
        try {
          const token = await AsyncStorage.getItem("jwtToken");
          const response = await axios.get(
            `http://192.168.200.128:8080/${globalUserId}/response`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMyResponse((prevState) => ({
            ...prevState,
            userResponse: response.data.responseText,
          }));
        } catch (error) {
          console.error("Error fetching user response:", error);
        }
      };

      fetchUserResponse();
    }
  }, [responseSubmitted]);

  const handleSubmit = async () => {
    const responseDto = {
      userId: globalUserId,
      questionId: questionId,
      responseText: userInput,
      dateResponded: new Date().toISOString(),
    };

    axios
      .post("http://192.168.200.128:8080/response", responseDto, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then((response) => {
        console.log("Response created:", response.data);
        setResponseSubmitted(true);
        navigation.navigate("Responses");
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
        <Text style={styles.qotwStyle}>{questionText}</Text>
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
