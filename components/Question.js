import React from "react";
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
} from "react-native";
import Button from "./Button";

export const Question = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Text style={styles.qotwStyle}>
            In the current war in the middle east, why does either side have a
            right to defend itself?
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View style={styles.textInputStyle}>
            <View style={{ flex: 8 }}>
              <TextInput
                multiline
                placeholder="Your response..."
                placeholderTextColor="white"
                keyboardAppearance="dark"
                selectionColor={"white"}
                style={styles.textInputStyle}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Button onPress={() => console.log("Submit Pressed")}>
                <Image
                  source={require("../assets/send.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#291400",
    marginVertical: 15,
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
    backgroundColor: "#424140",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  scrollViewStyle: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
});
