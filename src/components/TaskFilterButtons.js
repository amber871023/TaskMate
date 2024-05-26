import React from 'react';
import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from 'react-native';

const FilterButton = ({ onPress, isSelected, buttonText }) => (
  <TouchableOpacity onPress={onPress} style={[styles.filterButton, isSelected && styles.activeFilterButton]}>
    <Text style={[styles.filterButtonText, isSelected && styles.activeFilterButtonText]}>{buttonText}</Text>
  </TouchableOpacity>
);

const TaskFilterButtons = ({ onTodoPress, onCompletedPress, filter }) => (
  <View style={styles.container}>
    <FilterButton onPress={onTodoPress} isSelected={filter === 'todo'} buttonText="Todo" />
    <FilterButton onPress={onCompletedPress} isSelected={filter === 'completed'} buttonText="Completed" />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  activeFilterButton: {
    backgroundColor: '#CE5263',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default TaskFilterButtons;
