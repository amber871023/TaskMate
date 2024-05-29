import React, { createContext, useState } from 'react';
import { Alert, Platform } from 'react-native';
import moment from 'moment';

export const TasksContext = createContext();

export const TasksProvider = ({ children, token }) => {
  const [tasks, setTasks] = useState({ todoTasks: [], completedTasks: [] });
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://192.168.0.101:3000';


  const fetchTasks = async (token) => {
    try {
      const response = await fetch(`${basePlatformUrl}/users/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 304) {
        console.log("Tasks not modified");
        return;
      }

      const data = await response.json();
      const taskMarkedDates = {};

      data.forEach(task => {
        const taskDate = moment(task.date).format('YYYY-MM-DD');
        if (!taskMarkedDates[taskDate]) {
          taskMarkedDates[taskDate] = { marked: true, dotColor: '#CE5263' };
        }
      });

      const todoTasks = data.filter(task => {
        const taskDate = moment(task.date).format('YYYY-MM-DD');
        return !task.completed && taskDate === selectedDate;
      });

      const completedTasks = data.filter(task => {
        const taskDate = moment(task.date).format('YYYY-MM-DD');
        return task.completed && taskDate === selectedDate;
      });

      setMarkedDates({
        ...taskMarkedDates,
        [selectedDate]: {
          selected: true,
          selectedColor: '#FAB81B',
          selectedTextColor: '#fff',
          marked: true,
        },
      });
      setTasks({ todoTasks, completedTasks });
    } catch (error) {
      console.error('Error fetching tasks on Home screen:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };

  const fetchFilteredTasks = async (filter) => {
    try {
      const response = await fetch(`${basePlatformUrl}/users/tasks/${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      let data = await response.json();
      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      return data;
    } catch (error) {
      console.error('Error fetching filter tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks, markedDates, selectedDate, setSelectedDate, fetchFilteredTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
