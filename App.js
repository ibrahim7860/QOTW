import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserProfile } from "./UserProfile";
import { FriendProfile } from "./FriendProfile";

export default function App() {
  return (
    <View style={styles.container}>
      <FriendProfile
        firstName="Nayeem"
        lastName="Belal"
        username="dababy1212"
        isAdding={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
