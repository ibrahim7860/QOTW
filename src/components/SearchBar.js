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
    onSearch(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ marginVertical: 10 }}
    >
      <View style={styles.container}>
        <View>
          <Button onPress={() => console.log("Search Pressed")}>
            <MaterialIcons name="search" size={25} color="gray" />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Add or search friends"
            value={searchQuery}
            placeholderTextColor="#ababab"
            keyboardAppearance="dark"
            selectionColor={"white"}
            onChangeText={handleInputChange}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#424140",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});
