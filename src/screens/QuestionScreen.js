import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
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

export const QuestionScreen = ({ route, navigation }) => {
  const { alreadyResponded } = route.params;
  const { setMyResponse } = useResponses();
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    setMyResponse((prevState) => ({
      ...prevState,
      userResponse: userInput,
    }));
    navigation.navigate("Responses");
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
        <Text style={styles.qotwStyle}>
          In the current war in the middle east, why does either side have a
          right to defend itself?
        </Text>
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

            <View>
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
    marginBottom: 5,
    color: "white",
    fontWeight: "500",
    paddingTop: 7,
    padding: 7,
    paddingLeft: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#424140",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
  },
});
