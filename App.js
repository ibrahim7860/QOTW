import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./components/UserProfile";
import { FriendProfile } from "./components/FriendProfile";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { MyFriends } from "./components/MyFriends";

export default function App() {
  return (
    <View style={styles.container}>
      <MyFriends />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
