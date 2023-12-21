import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export const Register = () => {
  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ padding: 20, marginTop: "10%" }}>
          <View>
            <Text style={styles.headerStyle}>QOTW</Text>
            <Text style={styles.descriptionStyle}>
              Welcome, let's get right into it
            </Text>
          </View>

          <View style={{ marginVertical: 30 }}>
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
            />
            <TextInput
              placeholder="Re-Enter Password"
              placeholderTextColor="white"
              secureTextEntry
              keyboardAppearance="dark"
              selectionColor={"white"}
              style={styles.textInputStyle}
            />
          </View>

          <TouchableOpacity style={styles.createAccountStyle}>
            <Text style={styles.createTextStyle}>Create Account</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.haveAccountStyle}>
              Already have an account?
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginVertical: 30,
    textAlign: "center",
  },
  descriptionStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  textInputStyle: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    padding: 20,
    backgroundColor: "#424140",
    borderRadius: 15,
    marginVertical: 10,
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
    marginTop: 30,
    borderRadius: 20,
  },
  haveAccountStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "600",
  },
});