import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Response } from "./Response";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ripple from "react-native-material-ripple";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useResponses } from "./ResponsesContext";

export const ResponsePage = () => {
  const { responses, myResponse } = useResponses();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#291400" }}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.arrowContainer}>
          <Icon name="user-friends" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerStyle}>QOTW</Text>
        <TouchableOpacity>
          <Icon name="user-alt" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity>
          <View style={styles.myBoxStyle}>
            <Text style={styles.myResponseStyle}>
              {myResponse.userResponse}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.myTextStyle}>Your Response</Text>
          </View>
        </TouchableOpacity>
        {responses.map((item) => (
          <Response user={item} />
        ))}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    padding: 15,
    alignItems: "center",
    marginHorizontal: "20%",
  },
  topContainer: {
    backgroundColor: "#291400",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  myBoxStyle: {
    backgroundColor: "#ababab",
    borderRadius: 20,
    padding: "5%",
    marginVertical: 10,
    width: 320,
    alignSelf: "center",
  },
  myResponseStyle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1b0a01",
  },
  myTextStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ababab",
  },
});
