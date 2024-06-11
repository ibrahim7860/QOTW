import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { DismissKeyboard } from "../components/DismissKeyboard";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const inputEmailStyle = focus ? styles.focusInput : styles.textInputStyle;
  const inputReEnterStyle = emailFocus
    ? styles.focusInput
    : styles.textInputStyle;
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordResetMessage, setPasswordResetMessage] = useState("");

  const backToLogin = () => {
    navigation.navigate("Login");
  };

  const handleForgotPassword = () => {
    setEmailError("");
    setErrorMessage("");
    setPasswordResetMessage("");

    if (email === confirmEmail) {
      axios
        .post(
          `http://localhost:8080/users/forgot-password?email=${encodeURIComponent(
            email
          )}`
        )
        .then((response) => {
          setPasswordResetMessage(
            "A password reset link has been sent to the user's email if it exists"
          );
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    } else {
      setEmailError("Emails do not match.");
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.mainContainerStyle}>
        <View style={{ padding: 20 }}>
          <View>
            <Text style={styles.headerStyle}>QOTW</Text>
            <Text style={styles.descriptionStyle}>
              Forgot your password? Let's reset it.
            </Text>
          </View>

          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            scrollEnabled={false}
          >
            <View style={{ height: "10%" }} />
            <View style={{ marginBottom: 10 }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#ababab"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                style={inputEmailStyle}
                onChangeText={setEmail}
                value={email}
              />
              <TextInput
                placeholder="Re-Enter Email"
                placeholderTextColor="#ababab"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                style={inputReEnterStyle}
                onChangeText={setConfirmEmail}
                value={confirmEmail}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              {passwordResetMessage ? (
                <Text style={styles.successText}>{passwordResetMessage}</Text>
              ) : null}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.resetPasswordButtonStyle}
            onPress={handleForgotPassword}
          >
            <Text style={styles.resetPasswordTextStyle}>Reset Password</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.backToLoginStyle} onPress={backToLogin}>
              Back to Login
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
    textAlign: "center",
    marginBottom: "8%",
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
  resetPasswordTextStyle: {
    color: "#291400",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  resetPasswordButtonStyle: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: "5%",
    borderRadius: 20,
  },
  backToLoginStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: "5%",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginVertical: "3%",
  },
  successText: {
    color: "white",
    marginVertical: "3%",
  },
});
