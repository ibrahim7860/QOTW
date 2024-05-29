import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

export const LoadingScreen = ({navigation}) => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const spinnerTimer = setTimeout(() => {
            setShowSpinner(true);
        }, 1000);

        const navigateTimer = setTimeout(() => {
            navigation.navigate("Welcome Screen");
        }, 4000);

        return () => {
            clearTimeout(spinnerTimer);
            clearTimeout(navigateTimer);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>QOTW</Text>
            {showSpinner && <ActivityIndicator size="large" color="gray"/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#291400",
    },
    title: {
        fontSize: 75,
        color: "white",
        marginBottom: 20,
        fontWeight: "bold",
    },
});
