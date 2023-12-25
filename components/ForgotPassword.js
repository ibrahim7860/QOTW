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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export const ForgotPassword = ({ navigation }) => {
  const backToLogin = () => {
    navigation.navigate("Login");
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

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ marginVertical: 10, marginBottom: 0 }}
          >
            <View style={{ marginVertical: 15 }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#ababab"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
              <TextInput
                placeholder="Re-Enter Email"
                placeholderTextColor="#ababab"
                secureTextEntry
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.resetPasswordButtonStyle}>
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
    marginTop: "9%",
    borderRadius: 20,
  },
  backToLoginStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: "5%",
    fontWeight: "600",
  },
});
