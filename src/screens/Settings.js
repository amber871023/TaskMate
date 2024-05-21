import React from "react";
import { GlobalLayout } from "../constants/GlobalLayout";
import { StyleSheet, View, Text } from "react-native";

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Accessibility</Text>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
