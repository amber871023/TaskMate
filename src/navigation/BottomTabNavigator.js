import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/tabBarIcon";
import HomeStackScreen from "./HomeStack";
import SettingsStackScreen from "./SettingsStack";
//import Task from "../screens/Task";


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} library="Feather" name="home" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Task"
        component={Task}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} library="Feather" name="calendar" />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="settings"
        component={SettingsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              library="Feather"
              size={30}
              name="more-horizontal"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
