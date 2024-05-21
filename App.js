import React from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './src/navigation/HomeStack';
import SettingsStack from './src/navigation/SettingsStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        < NavigationContainer >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Settings') {
                  iconName = 'cog';
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FFC700',  // Active icon and label color
              tabBarInactiveTintColor: '#f8f8f8',  // Inactive icon and label color
              tabBarStyle: {
                backgroundColor: '#CE5263',
                paddingTop: 10, // Add paddingTop or marginTop as needed
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsStack} options={{
              headerStyle: {
                backgroundColor: "white",
              },
              headerTitleStyle: {
                fontSize: 32,
                fontWeight: "bold",
              },
              headerTintColor: "#CE5263",
              headerTitleAlign: "left"
            }} />
          </Tab.Navigator>
        </NavigationContainer >
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
