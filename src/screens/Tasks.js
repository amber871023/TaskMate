import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';

function AllTasks() {
  const { colorTheme, textSize } = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      <Text>Task</Text>
    </View>
  );
}

export default AllTasks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
