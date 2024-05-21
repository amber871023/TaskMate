import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Task from "../screens/Task";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName={"home"}>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="Task"
        component={Task}
        options={{ headerShown: true }}
      /> */}
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
