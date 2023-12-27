import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import Button from "./Button";
import { MaterialIcons } from "@expo/vector-icons";

export const Question = ({ route, navigation }) => {
  const { alreadyResponded } = route.params;

  return (
    <SafeAreaView style={styles.mainContainer}>
      {alreadyResponded && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
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
        >
          <View style={styles.textInputStyle}>
            <View style={{ flex: 1 }}>
              <TextInput
                multiline
                placeholder="Your response..."
                placeholderTextColor="white"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
            </View>

            <View>
              <Button onPress={() => console.log("Submit Pressed")}>
                <Image
                  source={require("../assets/send.png")}
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
    padding: 10,
    alignItems: "flex-end",
  },
  qotwStyle: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  textInputStyle: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    paddingTop: 7,
    padding: 7,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
