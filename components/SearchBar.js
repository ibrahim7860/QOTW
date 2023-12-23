import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "./Button";

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (text) => {
    setSearchQuery(text);
    onSearch(text); // Call the function passed from the parent component
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        <Button onPress={() => console.log("Search Pressed")}>
          <MaterialIcons name="search" size={25} color="gray" />
        </Button>
        <TextInput
          style={styles.input}
          placeholder="Add or search friends"
          value={searchQuery}
          placeholderTextColor="white"
          keyboardAppearance="dark"
          selectionColor={"white"}
          onChangeText={handleInputChange}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#424140",
    borderRadius: 30,
    margin: 20,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    paddingTop: 7,
    padding: 7,
  },
});
