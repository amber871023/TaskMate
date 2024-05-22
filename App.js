import React, { useState } from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './src/navigation/HomeStack';
import SettingsStack from './src/navigation/SettingsStack';
import CreateTaskButton from './src/components/CreateTaskButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreateTaskModal from './src/components/CreateTaskModal';

const Tab = createBottomTabNavigator();

const EmptyComponent = () => null;

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateTaskPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'Settings') {
                    iconName = 'cog';
                  }
                  return <FontAwesome5 name={iconName} size={24} color={color} />;
                },
                tabBarActiveTintColor: '#FFC700',
                tabBarInactiveTintColor: '#f8f8f8',
                tabBarStyle: {
                  backgroundColor: '#CE5263',
                },
                tabBarLabelStyle: {
                  fontSize: 16, // Adjust the font size as needed
                  fontWeight: 'bold',
                },
                tabBarIconStyle: {
                  marginTop: 5,
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
              <Tab.Screen
                name="CreateTask"
                component={EmptyComponent}
                options={{
                  tabBarButton: () => (
                    <CreateTaskButton onPress={handleCreateTaskPress} />
                  )
                }}
              />
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
            <CreateTaskModal visible={isModalVisible} onClose={handleCloseModal} />
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
const CustomTabBarIcon = ({ icon, color, size }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
      <FontAwesome5 name={icon} size={size} color={color} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
