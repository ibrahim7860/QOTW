import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./components/UserProfile";
import { FriendProfile } from "./components/FriendProfile";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { MyFriends } from "./components/MyFriends";
import { Question } from "./components/Question";
import { FriendRequests } from "./components/FriendRequests";
import { SearchBar } from "./components/SearchBar";
import { FriendItem } from "./components/FriendItem";
import { Response } from "./components/Response";
import { ResponsePage } from "./components/ResponsePage";

export default function App() {
  return (
    <View style={styles.container}>
      <ResponsePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
