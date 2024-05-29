import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import AllTasks from "../screens/AllTasks";
import ThemeContext from '../constants/ThemeContext';
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();

function HomeStackScreen({ username, token }) {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <HomeStack.Navigator initialRouteName={"home"}>
      <HomeStack.Screen
        name="home"
        children={(props) => <Home {...props} username={username} token={token} />}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Tasks"
        children={(props) => <AllTasks {...props} token={token} />}
        options={{
          headerShown: true,
          headerBackImage: () => (
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color="#FAB81B"
              paddingLeft={10}
            />),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colorTheme === 'dark' ? "#2A2626" : "#F9F6F6",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#CE5263",
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
