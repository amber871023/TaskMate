import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Alert } from 'react-native';
import { View, Text, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem';

function Home({ navigation, username, token }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [tasks, setTasks] = useState({ todoTasks: [], completedTasks: [] });

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#FAB81B',
      selectedTextColor: '#fff',
    },
  };

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://192.168.0.101';

  const fetchTasks = async () => {
    try {
      const todoTasksResponse = await fetch(`${basePlatformUrl}:3000/users/tasks/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todoTasksData = await todoTasksResponse.json();

      const completedTasksResponse = await fetch(`${basePlatformUrl}:3000/users/tasks/completed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const completedTasksData = await completedTasksResponse.json();

      setTasks({ todoTasks: todoTasksData, completedTasks: completedTasksData });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCompletion = async (id) => {
    try {
      const updatedTask = tasks.todoTasks.find(task => task.id === id);
      updatedTask.completed = !updatedTask.completed;

      const response = await fetch(`${basePlatformUrl}:3000/users/tasks/${id}/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: updatedTask.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task completed status');
      }

      setTasks(prevState => ({
        ...prevState,
        todoTasks: prevState.todoTasks.map(task => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      console.error('Error updating task completed status:', error);
      Alert.alert('Error', 'Failed to update task completion status. Please try again later.');
    }
  };

  const handleEditTask = (id) => {
    console.log(`Editing task ${id}`);
  };

  const handleDeleteTask = (id) => {
    console.log(`Deleting task ${id}`);
  };

  const renderTask = ({ item }) => (
    <TaskItem
      item={item}
      handleTaskCompletion={handleTaskCompletion}
      handleEditTask={handleEditTask}
      handleDeleteTask={handleDeleteTask}
      textSize={textSize}
      token={token}
    />
  );

  const { todoTasks, completedTasks } = tasks;

  return (
    <GlobalLayout>
      <Text fontSize={24} fontWeight={'bold'} my={10} color='#CE5263'>Hi, {username}</Text>
      <HStack justifyContent='space-between' mb={10}>
        <Text style={[{ color: colorTheme === 'dark' ? '#fff' : '#000' }]} fontWeight={'bold'} fontSize={20}>
          {moment(selectedDate).isSame(moment(), 'day') ? "Today's Tasks" : `Tasks on ${moment(selectedDate).format('DD, MMM')}`}
        </Text>
        <Button
          variant="solid"
          bgColor="#FAB81B"
          borderRadius={50}
          height={32}
          isDisabled={false}
          onPress={() => navigation.navigate('Tasks')}
        >
          <ButtonText fontSize={16} color="white" textAlign="center">All Tasks</ButtonText>
        </Button>
      </HStack>
      <View style={{ borderRadius: 15, overflow: 'hidden' }} mb={10}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          style={{ height: 305 }}
          theme={{ todayTextColor: '#DB7C2E', selectedDayTextColor: '#DB7C2E', arrowColor: '#DB7C2E', textSectionTitleColor: '#CE5263' }}
        />
      </View>
      {todoTasks.length > 0 ? (
        <View height={'25%'}>
          <Text style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Todo Tasks</Text>
          <FlatList data={todoTasks} renderItem={renderTask} keyExtractor={(item) => item.id.toString()} />
        </View>
      ) : (
        <Text my={20} textAlign='center' color='#a0a0a0'>No tasks for this day</Text>
      )}
      {completedTasks.length > 0 && (
        <View height={'18%'}>
          <Text mt={5} style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Completed Tasks</Text>
          <FlatList data={completedTasks} renderItem={renderTask} keyExtractor={(item) => item.id.toString()} />
        </View>
      )}
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  taskSectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});

export default Home;
