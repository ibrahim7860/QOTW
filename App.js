import { StyleSheet, View } from "react-native";
import { UserProfileScreen } from "./frontend/screens/UserProfileScreen";
import { FriendProfileScreen } from "./frontend/screens/FriendProfileScreen";
import { WelcomeScreen } from "./frontend/screens/WelcomeScreen";
import { RegisterScreen } from "./frontend/screens/RegisterScreen";
import { LoginScreen } from "./frontend/screens/LoginScreen";
import { MyFriendsScreen } from "./frontend/screens/MyFriendsScreen";
import { QuestionScreen } from "./frontend/screens/QuestionScreen";
import { FriendRequestsScreen } from "./frontend/screens/FriendRequestsScreen";
import { MessagesScreen } from "./frontend/screens/MessagesScreen";
import { ChatScreen } from "./frontend/screens/ChatScreen";
import { ConversationsProvider } from "./frontend/context/ConversationsContext";
import { LoadingScreen } from "./frontend/screens/LoadingScreen";
import { FriendsProvider } from "./frontend/context/FriendsContext";
import { ForgotPasswordScreen } from "./frontend/screens/ForgotPasswordScreen";
import { ResponsesScreen } from "./frontend/screens/ResponsesScreen";
import { ResponsesProvider } from "./frontend/context/ResponsesContext";
import { NavigationContainer } from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import { ReactionsProvider } from "./frontend/context/ReactionsContext";

const Stack = createStackNavigator();

const slightAnimation = {
  animationEnabled: true,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 100 } },
    close: { animation: 'timing', config: { duration: 100 } },
  },
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
};

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
                    options={slightAnimation}
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
