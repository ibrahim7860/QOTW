import React, {useState} from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, TextInput, View,} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const SearchBar = ({onSearch, isSearching}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (text) => {
        setSearchQuery(text);
        onSearch(text);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{marginVertical: 10}}
        >
            <View style={styles.container}>
                <View>
                    <View>
                        <MaterialIcons name="search" size={25} color="gray"/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.input}
                        placeholder={isSearching ? "Search for friends to add" : "Find your friends"}
                        value={searchQuery}
                        placeholderTextColor="#ababab"
                        keyboardAppearance="dark"
                        selectionColor={"#ababab"}
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
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: "white",
        fontWeight: "500",
    },
});
