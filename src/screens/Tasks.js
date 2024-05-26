import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { View, Text, HStack } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem';
import TaskFilterButtons from '../components/TaskFilterButtons'


function AllTasks() {
  const { colorTheme, textSize } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Meeting w/ BBC', color: '#CE5263', priority: 'high', completed: true, date: '2024-05-23' },
    { id: 2, text: 'Hit the gym', color: '#62AAED', priority: 'low', completed: false, date: '2024-05-23' },
    { id: 3, text: 'Meeting w/ BBC', color: '#FFB533', priority: 'medium', completed: true, date: '2024-05-24' },
    { id: 4, text: 'Pay the rent', color: '#A9E877', priority: 'high', completed: false, date: '2024-05-23' },
    { id: 5, text: 'Hit the gym', color: '#62AAED', priority: 'low', completed: false, date: '2024-05-24' },
    { id: 6, text: 'Meeting w/ BBC', color: '#CE5263', priority: 'medium', completed: true, date: '2024-05-23' },
    { id: 7, text: 'Meeting w/ BBC', color: '#5275CE', priority: 'low', completed: true, date: '2024-05-23' },
    { id: 8, text: 'Hit the gym', color: '#8940D3', priority: 'high', completed: false, date: '2024-05-23' },
  ].sort((a, b) => new Date(b.date) - new Date(a.date)));

  const [currentTappedItemId, setCurrentTappedItemId] = useState(null);
  const [taps, setTaps] = useState(0);
  const [filter, setFilter] = useState('todo'); // 'todo' or 'completed'

  const handleTaskCompletion = () => {
    if (taps === 1) {
      setTasks(
        tasks.map((task) => (task.id === currentTappedItemId ? { ...task, completed: true } : task))
      );
    } else if (taps === 2) {
      setTasks(
        tasks.map((task) => (task.id === currentTappedItemId ? { ...task, completed: false } : task))
      );
    }
    setCurrentTappedItemId(null);
    setTaps(0);
  };

  const handleEditTask = (id) => {
    console.log(`Editing task ${id}`);
  };

  const handleDeleteTask = (id) => {
    console.log(`Deleting task ${id}`);
  };

  const handleTap = (itemId) => {
    if (itemId === currentTappedItemId) {
      setTaps(taps + 1);
    } else {
      setCurrentTappedItemId(itemId);
      setTaps(1);
    }
    setTimeout(() => {
      handleTaskCompletion();
    }, 250); // Adjust delay as needed (e.g., 300ms)
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'todo' ? !task.completed : task.completed
  );

  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      <TaskFilterButtons
        onTodoPress={() => setFilter('todo')}
        onCompletedPress={() => setFilter('completed')}
        filter={filter}
      />
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskItem
            key={item.id}
            item={item}
            onPress={() => handleTap(item.id)}
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
    color: 'gray',
    fontWeight: 'bold',
  },
  activeFilterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#CE5263',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default AllTasks;
