import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, Platform } from 'react-native';
import { View } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem';
import TaskFilterButtons from '../components/TaskFilterButtons';
import { TasksContext } from '../constants/TasksContext';

function AllTasks({ token }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const { fetchTasks, fetchFilteredTasks } = useContext(TasksContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todo'); // 'todo' or 'completed'

  useEffect(() => {
    if (token) {
      handleFilterChange(filter);
      fetchTasks(token);
    }
  }, [token, filter]);

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    try {
      const filteredTasks = await fetchFilteredTasks(newFilter);
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching filter tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };
  const handleTaskUpdate = async () => {
    try {
      const filteredTasks = await fetchFilteredTasks(filter);
      setTasks(filteredTasks);
      fetchTasks(token);
    } catch (error) {
      console.error('Error fetching filter tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      <TaskFilterButtons
        onTodoPress={() => handleFilterChange('todo')}
        onCompletedPress={() => handleFilterChange('completed')}
        filter={filter}
      />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            key={item.id}
            item={item}
            textSize={textSize}
            token={token}
            onUpdate={handleTaskUpdate}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AllTasks;
