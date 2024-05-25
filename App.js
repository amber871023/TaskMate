import React, { useState, useContext } from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider } from './src/constants/ThemeContext';
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
import ThemeContext from './src/constants/ThemeContext';
import Login from './src/screens/Login';

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
      <ThemeProvider>
        <AppContent
          handleCreateTaskPress={handleCreateTaskPress}
          isModalVisible={isModalVisible}
          handleCloseModal={handleCloseModal}
        />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}



function AppContent({ handleCreateTaskPress, isModalVisible, handleCloseModal }) {
  const { colorTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = ({ username }) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {isLoggedIn ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'settings') {
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
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                tabBarIconStyle: {
                  marginTop: 5,
                },
              })}
            >
              <Tab.Screen
                name="Home"
                children={() => <HomeStack username={username} />}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="CreateTask"
                component={EmptyComponent}
                options={{
                  tabBarButton: () => (
                    <CreateTaskButton onPress={handleCreateTaskPress} />
                  ),
                }}
              />
              <Tab.Screen
                name="settings"
                options={{ headerShown: false }} // Hide the header only for the Settings screen
              >
                {props => <SettingsStack {...props} handleLogout={handleLogout} />}
              </Tab.Screen>
            </Tab.Navigator>
            <CreateTaskModal visible={isModalVisible} onClose={handleCloseModal} />
          </NavigationContainer>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
