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
import { Messages } from "./components/Messages";
import { ChatScreen } from "./components/ChatScreen";
import { ConversationsProvider } from "./components/ConversationsContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { FriendsProvider } from "./components/FriendsContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ConversationsProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Loading"
          >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ConversationsProvider>
    // <FriendsProvider>
    //   <View style={styles.container}>
    //     <MyFriends />
    //   </View>
    // </FriendsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
