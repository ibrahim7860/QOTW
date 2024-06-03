import React, {useEffect, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import {useToken} from "../context/TokenContext";
import {DismissKeyboard} from "../components/DismissKeyboard";
import {userContext} from "../context/UserContext";

export const RegisterScreen = ({navigation}) => {
    const [focus, setFocus] = useState(false);
    const inputUserStyle = focus ? styles.focusInput : styles.textInputStyle;
    const [userFocus, setUserFocus] = useState(false);
    const inputNameStyle = userFocus ? styles.focusInput : styles.textInputStyle;
    const [emailFocus, setEmailFocus] = useState(false);
    const inputEmailStyle = emailFocus
        ? styles.focusInput
        : styles.textInputStyle;
    const [passFocus, setPassFocus] = useState(false);
    const inputPassStyle = passFocus ? styles.focusInput : styles.textInputStyle;
    const [rePassFocus, setRePassFocus] = useState(false);
    const inputReStyle = rePassFocus ? styles.focusInput : styles.textInputStyle;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [verifyEmailMessage, setVerifyEmailMessage] = useState("");
    const MIN_USERNAME_LENGTH = 3;
    const {setGlobalUserId, setGlobalFullName} = userContext();
    const [localUserId, setLocalUserId] = useState("");
    const {storeToken} = useToken();
    const {getToken} = useToken();

    const handleAlreadyHaveAccount = () => {
        navigation.navigate("Login");
    };

    useEffect(() => {
        let intervalId;

        if (localUserId) {
            intervalId = setInterval(async () => {
                axios
                    .get(`http://localhost:8080/users/${localUserId}/status`, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.email_verified) {
                            clearInterval(intervalId);
                            navigation.navigate("Profile Picture");
                        }
                    })
                    .catch((error) => {
                        setErrorMessage("Error checking verification status");
                    });
            }, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [localUserId]);

    const handleRegister = () => {
        setPasswordError("");
        setUsernameError("");
        setFullNameError("");
        setEmailError("");
        setErrorMessage("");
        setVerifyEmailMessage("");

        if (!fullName.trim()) {
            setFullNameError("Full Name is required");
            return;
        }
        if (!username.trim()) {
            setUsernameError("Username is required");
            return;
        }
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        if (username.length < MIN_USERNAME_LENGTH) {
            setUsernameError("Username must be at least 3 characters");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        const names = fullName.trim().split(" ");
        const firstName = names[0];
        const lastName = names.length > 1 ? names[names.length - 1] : "";

        const userData = {
            userId: username.toLowerCase(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        axios
            .post("http://localhost:8080/users/register", userData)
            .then((response) => {
                storeToken(response.data.jwt);
                setGlobalUserId(response.data.userId);
                setGlobalFullName(
                    response.data.firstName + " " + response.data.lastName
                );
                setLocalUserId(response.data.userId);
                setVerifyEmailMessage(
                    "Registration successful! Please check your email to verify your account."
                );
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    if (error.response.data.message) {
                        setErrorMessage(error.response.data.message);
                    } else if (error.response.data.email) {
                        setErrorMessage(error.response.data.email);
                    } else {
                        setErrorMessage("An unknown error occurred");
                    }
                } else {
                    setErrorMessage("Unable to connect to the server");
                }
            });
    };

    return (
        <DismissKeyboard>
            <SafeAreaView style={styles.mainContainerStyle}>
                <View
                    style={{
                        padding: "5%",
                    }}
                >
                    <Text style={styles.headerStyle}>QOTW</Text>
                    <Text style={styles.descriptionStyle}>
                        Just a few quick steps and you'll be all set!
                    </Text>
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flex: 1}}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                    scrollEnabled={true}
                    extraScrollHeight={35}
                >
                    <View style={{paddingHorizontal: 20, marginVertical: "5%"}}>
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#ababab"
                            keyboardAppearance="dark"
                            selectionColor={"#ababab"}
                            style={inputUserStyle}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        {fullNameError ? (
                            <Text style={{color: "red"}}>{fullNameError}</Text>
                        ) : null}
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#ababab"
                            keyboardAppearance="dark"
                            selectionColor={"#ababab"}
                            style={inputNameStyle}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            value={username}
                            onChangeText={setUsername}
                            maxLength={18}
                        />
                        {usernameError ? (
                            <Text style={{color: "red"}}>{usernameError}</Text>
                        ) : null}
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#ababab"
                            keyboardAppearance="dark"
                            selectionColor={"#ababab"}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            style={inputEmailStyle}
                            value={email}
                            onChangeText={setEmail}
                        />
                        {emailError ? (
                            <Text style={{color: "red"}}>{emailError}</Text>
                        ) : null}
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#ababab"
                            secureTextEntry={true}
                            keyboardAppearance="dark"
                            selectionColor={"#ababab"}
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                            style={inputPassStyle}
                            onChangeText={setPassword}
                            value={password}
                            textContentType={'oneTimeCode'}
                        />
                        <TextInput
                            placeholder="Re-Enter Password"
                            placeholderTextColor="#ababab"
                            secureTextEntry={true}
                            keyboardAppearance="dark"
                            selectionColor={"#ababab"}
                            onFocus={() => setRePassFocus(true)}
                            onBlur={() => setRePassFocus(false)}
                            style={inputReStyle}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                        <View style={{height: "3%"}}/>
                        {passwordError ? (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        ) : null}
                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}
                        {verifyEmailMessage ? (
                            <Text style={styles.successText}>{verifyEmailMessage}</Text>
                        ) : null}
                    </View>
                    <View style={{flexGrow: 3, paddingHorizontal: 20}}>
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
        fontSize: Dimensions.get("window").width > 380 ? 70 : 60,
        fontWeight: "700",
        marginVertical: Dimensions.get("window").width > 380 ? "10%" : "4%",
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
        padding: "4%",
        backgroundColor: "#424140",
        borderRadius: 10,
        marginVertical: "2%",
    },
    focusInput: {
        fontSize: 15,
        color: "white",
        fontWeight: "600",
        padding: "4%",
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
        paddingVertical: "4%",
        paddingHorizontal: "5%",
        borderRadius: 20,
    },
    haveAccountStyle: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        marginVertical: "4%",
        fontWeight: "600",
    },
    errorText: {
        color: "red",
        marginBottom: "3%",
    },
    successText: {
        color: "white",
        marginBottom: "3%",
    },
});
