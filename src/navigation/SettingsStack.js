import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import About from "../screens/About";
import OpenSourceLicenses from "../screens/OpenSourceLicenses";

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="settings">
      <SettingsStack.Screen
        name="settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="About"
        component={About}
        options={{ headerShown: true }}
      />
      <SettingsStack.Screen
        name="OpenSourceLicenses"
        component={OpenSourceLicenses}
        options={{ headerShown: true }}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;
