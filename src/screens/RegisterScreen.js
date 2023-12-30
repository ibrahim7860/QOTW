import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export const RegisterScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleAlreadyHaveAccount = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    if (password === confirmPassword) {
      // Proceed with the registration process
      setPasswordError("");
      // ... registration logic
      navigation.navigate("Question", { alreadyResponded: false });
    } else {
      setPasswordError("Passwords do not match.");
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when tapped outside
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.mainContainerStyle}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.headerStyle}>QOTW</Text>
          <Text style={styles.descriptionStyle}>
            Just a few quick steps and you'll be all set!
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={{ paddingHorizontal: 20 }}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="white"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor="white"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="white"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
                onChangeText={setPassword}
                value={password}
              />
              <TextInput
                placeholder="Re-Enter Password"
                placeholderTextColor="white"
                secureTextEntry
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>
          </ScrollView>
          <View style={{ flexGrow: 3, paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={styles.createAccountStyle}
              onPress={handleRegister}
            >
              <Text style={styles.createTextStyle}>Create Account</Text>
            </TouchableOpacity>

            <View>
              <Text
                style={styles.haveAccountStyle}
                onPress={handleAlreadyHaveAccount}
              >
                Already have an account?
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: "#291400",
  },
  headerStyle: {
    color: "white",
    fontSize: 70,
    fontWeight: "700",
    marginVertical: "8%",
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
    padding: 20,
    backgroundColor: "#424140",
    borderRadius: 15,
    marginVertical: "2%",
  },
  createTextStyle: {
    color: "#291400",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  createAccountStyle: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  haveAccountStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: "4%",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
  },
});
