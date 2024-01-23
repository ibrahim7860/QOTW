import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useResponses } from "../context/ResponsesContext";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export const LoginScreen = ({ navigation }) => {
  const { myResponse } = useResponses();
  const handleForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  const handleCreateNewAccount = () => {
    navigation.navigate("Register");
  };

  const onSignIn = () => {
    if (!myResponse.userResponse) {
      navigation.navigate("Question", { alreadyResponded: false });
    } else {
      navigation.navigate("Responses");
    }
  };

  const [focus, setFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const inputUserStyle = focus ? styles.focusInput : styles.textInputStyle;
  const inputPassStyle = passwordfocus
    ? styles.focusInput
    : styles.textInputStyle;

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.mainContainerStyle}>
        <View style={{ padding: 20 }}>
          <View>
            <Text style={styles.headerStyle}>QOTW</Text>
            <Text style={styles.descriptionStyle}>
              Welcome, let's get right into it
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ marginVertical: 10, marginBottom: 0 }}
          >
            <View style={{ marginVertical: "5%" }}>
              <TextInput
                placeholder="Username or Email"
                placeholderTextColor="#ababab"
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={inputUserStyle}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#ababab"
                secureTextEntry
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                style={inputPassStyle}
              />
            </View>
          </KeyboardAvoidingView>
          <View>
            <Text
              style={styles.forgotPasswordStyle}
              onPress={handleForgotPassword}
            >
              Forgot your password?
            </Text>
          </View>

          <TouchableOpacity style={styles.loginButtonStyle} onPress={onSignIn}>
            <Text style={styles.loginTextStyle}>Sign in</Text>
          </TouchableOpacity>

          <View>
            <Text
              style={styles.createAccountStyle}
              onPress={handleCreateNewAccount}
            >
              Create new account
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#291400",
  },
  headerStyle: {
    color: "white",
    fontSize: 70,
    fontWeight: "700",
    marginVertical: "5%",
    textAlign: "center",
  },
  descriptionStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  textInputStyle: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    padding: 15,
    backgroundColor: "#424140",
    borderRadius: 10,
    marginVertical: "2%",
  },
  focusInput: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    padding: 15,
    backgroundColor: "#424140",
    borderRadius: 10,
    marginVertical: "2%",
    borderWidth: 1,
    borderColor: "#ababab",
  },
  forgotPasswordStyle: {
    fontSize: 15,
    alignSelf: "flex-end",
    color: "white",
    fontWeight: "700",
  },
  loginTextStyle: {
    color: "#291400",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  loginButtonStyle: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: "5%",
    borderRadius: 20,
  },
  createAccountStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: "5%",
    fontWeight: "700",
  },
});
