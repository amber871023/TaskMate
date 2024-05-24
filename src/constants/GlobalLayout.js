import React, { useContext } from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import ThemeContext from '../constants/ThemeContext';

export function GlobalLayout({ children }) {
  const { colorTheme, textSize } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});
