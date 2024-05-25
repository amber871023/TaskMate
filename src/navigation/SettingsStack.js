import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import About from "../screens/About";
import OpenSourceLicenses from "../screens/OpenSourceLicenses";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from '../constants/ThemeContext';

const SettingsStack = createStackNavigator();

function SettingsStackScreen({ handleLogout }) {
  const { colorTheme } = useContext(ThemeContext);
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colorTheme === 'dark' ? "#2A2626" : "#F9F6F6",
          },
          headerTitleStyle: {
            color: "#CE5263",
            fontSize: 32,
            fontWeight: "bold",
            paddingLeft: 10,
          },
          headerTintColor: colorTheme === 'dark' ? "#DB7C2E" : "#CE5263",
          headerTitleAlign: "left",
        }}
      >
        {props => <Settings {...props} handleLogout={handleLogout} />}
      </SettingsStack.Screen>
      <SettingsStack.Screen
        name="About"
        component={About}
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
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;
