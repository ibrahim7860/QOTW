import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./UserProfile";

export default function App() {
  return (
    <View style={styles.container}>
      <UserProfile
        firstName="Ibrahim"
        lastName="Ahmed"
        username="ibbytoolitty"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
    alignItems: "center",
    justifyContent: "center",
  },
});
