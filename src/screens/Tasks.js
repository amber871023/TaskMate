import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem'; // Import the TaskItem component

function AllTasks() {
  const { colorTheme, textSize } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
    { id: 2, text: 'Hit the gym', completed: false, date: '2024-05-23' },
    { id: 3, text: 'Meeting w/ BBC', completed: true, date: '2024-05-24' },
    { id: 4, text: 'Hit the gym', completed: false, date: '2024-05-23' },
    { id: 5, text: 'Hit the gym', completed: false, date: '2024-05-24' },
    { id: 6, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
  ]);

  const handleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };
  const handleEditTask = (id) => {
    console.log(`Editing task ${id}`);
  };

  const handleDeleteTask = (id) => {
    console.log(`Deleting task ${id}`);
  };
  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      {/* Render a FlatList of TaskItems */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            key={item.id}
            item={item}
            handleTaskCompletion={handleTaskCompletion}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            textSize={textSize}
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
