import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get("window");

export const WelcomeScreen = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View>
        <ImageBackground
          style={styles.imageBackgroundStyle}
          resizeMode="contain"
          source={require("../../assets/welcome-img.png")}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 30,
          paddingTop: "10%",
        }}
      >
        <Text style={styles.headerStyle}>
          Experience.{"\n"}Meaningful.{"\n"}Conversations.
        </Text>
        <Text style={styles.descriptionTextStyle}>
          Sign up or log in to engage in purposeful conversations with people
          across the world
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: "11%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={styles.loginButtonStyle} onPress={goToLogin}>
          <Text style={styles.loginTextStyle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButtonStyle}
          onPress={goToRegister}
        >
          <Text style={styles.registerTextStyle}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: "#291400",
    justifyContent: "center",
    height: height,
  },
  imageBackgroundStyle: {
    height: height / 2.5,
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  descriptionTextStyle: {
    marginTop: 20,
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
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
    width: "48%",
    borderRadius: 20,
  },
  registerTextStyle: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  registerButtonStyle: {
    backgroundColor: "#291400",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "48%",
    borderRadius: 20,
  },
});
