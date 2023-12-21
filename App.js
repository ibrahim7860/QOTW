import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./UserProfile";
import { WelomeScreen } from "./WelomeScreen";
import { Login } from "./Login";
import { Register } from "./Register";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
