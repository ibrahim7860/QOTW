import { StyleSheet, View } from "react-native";
import { UserProfileScreen } from "./src/screens/UserProfileScreen";
import { FriendProfileScreen } from "./src/screens/FriendProfileScreen";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { MyFriendsScreen } from "./src/screens/MyFriendsScreen";
import { QuestionScreen } from "./src/screens/QuestionScreen";
import { FriendRequestsScreen } from "./src/screens/FriendRequestsScreen";
import { MessagesScreen } from "./src/screens/MessagesScreen";
import { ChatScreen } from "./src/screens/ChatScreen";
import { ConversationsProvider } from "./src/context/ConversationsContext";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { FriendsProvider } from "./src/context/FriendsContext";
import { ForgotPasswordScreen } from "./src/screens/ForgotPasswordScreen";
import { ResponsesScreen } from "./src/screens/ResponsesScreen";
import { ResponsesProvider } from "./src/context/ResponsesContext";
import { NavigationContainer } from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import { ReactionsProvider } from "./src/context/ReactionsContext";

const Stack = createStackNavigator();

const leftToRightAnimation = {
  animationEnabled: true,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 100 } },
    close: { animation: 'timing', config: { duration: 100 } },
  },
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
};

const bottomToTopAnimation = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0], // Transition from bottom to top
          }),
        },
      ],
    },
  };
};

export default function App() {
  return (
    <ConversationsProvider>
      <FriendsProvider>
        <ResponsesProvider>
          <ReactionsProvider>
            <View style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="Loading"
                >
                  <Stack.Screen name="Loading" component={LoadingScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen
                    name="Forgot Password"
                    component={ForgotPasswordScreen}
                  />
                  <Stack.Screen name="Messages" component={MessagesScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                  <Stack.Screen
                    name="Welcome Screen"
                    component={WelcomeScreen}
                  />
                  <Stack.Screen name="Responses" component={ResponsesScreen} />
                  <Stack.Screen
                    name="User Profile"
                    component={UserProfileScreen}
                  />
                  <Stack.Screen
                    name="Friend Profile"
                    component={FriendProfileScreen}
                  />
                  <Stack.Screen
                    name="My Friends"
                    component={MyFriendsScreen}
                    options={leftToRightAnimation}
                  />
                  <Stack.Screen
                    name="Friend Requests"
                    component={FriendRequestsScreen}
                    options={leftToRightAnimation}
                  />
                  <Stack.Screen
                    name="Question"
                    component={QuestionScreen}
                    options={{
                      cardStyleInterpolator: bottomToTopAnimation,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </ReactionsProvider>
        </ResponsesProvider>
      </FriendsProvider>
    </ConversationsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#291400",
  },
});
