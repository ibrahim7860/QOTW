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
import { Messages } from "./components/Messages";
import { ChatScreen } from "./components/ChatScreen";
import { ConversationsProvider } from "./components/ConversationsContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { FriendsProvider } from "./components/FriendsContext";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResponsePage } from "./components/ResponsePage";
import { ResponsesProvider } from "./components/ResponsesContext";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

const leftToRightAnimation = {
  gestureDirection: "horizontal-inverted",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  return (
    <ConversationsProvider>
      <FriendsProvider>
        <ResponsesProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Loading"
              >
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                  name="Forgot Password"
                  component={ForgotPassword}
                />
                <Stack.Screen name="Messages" component={Messages} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
                <Stack.Screen name="Responses" component={ResponsePage} />
                <Stack.Screen name="User Profile" component={UserProfile} />
                <Stack.Screen name="Friend Profile" component={FriendProfile} />
                <Stack.Screen
                  name="My Friends"
                  component={MyFriends}
                  options={leftToRightAnimation}
                />
                <Stack.Screen
                  name="Friend Requests"
                  component={FriendRequests}
                  options={{ animationEnabled: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ResponsesProvider>
      </FriendsProvider>
    </ConversationsProvider>
    // <ResponsesProvider>
    //   <View style={styles.container}>
    //     <ResponsePage />
    //   </View>
    // </ResponsesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
