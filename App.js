import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./components/UserProfile";
import { FriendProfile } from "./components/FriendProfile";

export default function App() {
  return (
    <View style={styles.container}>
      <UserProfile firstName="Nayeem" lastName="Belal" username="dababy1212" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
