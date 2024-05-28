import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, Platform } from 'react-native';
import { View } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem';
import TaskFilterButtons from '../components/TaskFilterButtons';

function AllTasks({ token }) {
  const { colorTheme, textSize } = useContext(ThemeContext);

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://192.168.0.101';
  const baseApiUrl = `${basePlatformUrl}:3000`;

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todo'); // 'todo' or 'completed'

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/users/tasks/${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      let data = await response.json();
      // Sort tasks by date in descending order
      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTasks(data);
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };


  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    await fetchTasks(); // Wait for the tasks to be fetched before rendering
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
            fetchTasks={fetchTasks}
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
