import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import About from "../screens/About";
import OpenSourceLicenses from "../screens/OpenSourceLicenses";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from '../constants/ThemeContext';


const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  const { colorTheme } = useContext(ThemeContext);

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
        options={{
          headerShown: true,
          headerBackImage: () => (
            <Ionicons
              name="chevron-back-outline"
              size={27}
              color="#FAB81B"
              pl={10}
            />),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colorTheme === 'dark' ? "#2A2626" : "white",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: colorTheme === 'dark' ? "white" : "dark",
          },
        }}
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
