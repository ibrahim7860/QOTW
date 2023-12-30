import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

  const [focus, setFocus] = useState(false);
  const inputUserStyle = focus ? styles.focusInput : styles.textInputStyle;

  const [userfocus, setUserFocus] = useState(false);
  const inputnameStyle = userfocus ? styles.focusInput : styles.textInputStyle;

  const [emailfocus, setemailFocus] = useState(false);
  const inputEmailStyle = emailfocus
    ? styles.focusInput
    : styles.textInputStyle;

  const [passfocus, setpassFocus] = useState(false);
  const inputpassStyle = passfocus ? styles.focusInput : styles.textInputStyle;

  const [rePassfocus, setrePassFocus] = useState(false);
  const inputreStyle = rePassfocus ? styles.focusInput : styles.textInputStyle;

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
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardOpeningTime={100}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#ababab"
              keyboardAppearance="dark"
              selectionColor={"#ababab"}
              style={inputUserStyle}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#ababab"
              keyboardAppearance="dark"
              selectionColor={"#ababab"}
              style={inputnameStyle}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ababab"
              keyboardAppearance="dark"
              selectionColor={"#ababab"}
              onFocus={() => setemailFocus(true)}
              onBlur={() => setemailFocus(false)}
              style={inputEmailStyle}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ababab"
              secureTextEntry
              keyboardAppearance="dark"
              selectionColor={"#ababab"}
              onFocus={() => setpassFocus(true)}
              onBlur={() => setpassFocus(false)}
              style={inputpassStyle}
              onChangeText={setPassword}
              value={password}
            />
            <TextInput
              placeholder="Re-Enter Password"
              placeholderTextColor="#ababab"
              secureTextEntry
              keyboardAppearance="dark"
              selectionColor={"#ababab"}
              onFocus={() => setrePassFocus(true)}
              onBlur={() => setrePassFocus(false)}
              style={inputreStyle}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <View style={{ height: 60 }} />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
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
        </KeyboardAwareScrollView>
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
