import React, {useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useResponses} from "../context/ResponsesContext";
import axios from "axios";
import {useToken} from "../context/TokenContext";
import {DismissKeyboard} from "../components/DismissKeyboard";

export const LoginScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputUserStyle = focus ? styles.focusInput : styles.textInputStyle;
  const inputPassStyle = passwordfocus
      ? styles.focusInput
      : styles.textInputStyle;
  const { updateResponse, setGlobalUserId, setGlobalFullName, updateFullName, globalFullName } = useResponses();
  const { storeToken, getToken } = useToken();

  const handleForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  const handleCreateNewAccount = () => {
    navigation.navigate("Register");
  };

  const onSignIn = () => {
    setUsernameError("");
    setPasswordError("");
    setErrorMessage("");

    if (!username.trim()) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const loginData = {
      userId: username,
      password: password,
    }

    axios.post('http://localhost:8080/users/login', loginData)
        .then(async response => {
          const token = response.data.jwt;
          console.log('Login successful:', token);
          storeToken(token)
          setGlobalUserId(username);
          setGlobalFullName(response.data.fullName);
          try {
            const response = await axios.get(`http://localhost:8080/${username}/response`, {
              headers: {
                Authorization: `Bearer ${await getToken()}`
              }
            });
            const userResponse = response.data.responseText;

            if (!userResponse) {
              navigation.navigate("Question", {alreadyResponded: false});
            } else {
              updateResponse(response);
              updateFullName(globalFullName);
              navigation.navigate("Responses");
            }
          } catch (error) {
            console.error('Error fetching user response:', error);
          }
        })
        .catch(error => {
          setErrorMessage(error.response.data.message);
        });
  };

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
                placeholder="Username"
                placeholderTextColor="#ababab"
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={username}
                onChangeText={setUsername}
                style={inputUserStyle}
              />
              {usernameError ? (
                  <Text style={{ color: "red" }}>{usernameError}</Text>
              ) : null}
              <TextInput
                placeholder="Password"
                placeholderTextColor="#ababab"
                secureTextEntry
                keyboardAppearance="dark"
                selectionColor={"#ababab"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                style={inputPassStyle}
                onChangeText={setPassword}
                value={password}
              />
                {passwordError ? (
                    <Text style={{ color: "red" }}>{passwordError}</Text>
                ) : null}
              {errorMessage ? (
                  <Text style={{ color: "red" }}>{errorMessage}</Text>
              ) : null}
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
