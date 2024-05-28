import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Alert } from 'react-native';
import { View, Text, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import TaskItem from '../components/TaskItem';

function Home({ navigation, username, token }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [tasks, setTasks] = useState({ todoTasks: [], completedTasks: [] });
  const [markedDates, setMarkedDates] = useState({});

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://192.168.0.101';

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${basePlatformUrl}:3000/users/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 304) {
        // Handle the case where the data has not been modified
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

      // Update the markedDates with the selectedDate marking
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

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, selectedDate]);

  const renderTask = ({ item }) => (
    <TaskItem
      item={item}
      textSize={textSize}
      token={token}
      fetchTasks={fetchTasks}
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
          style={{ height: 310 }}
          theme={{ todayTextColor: '#DB7C2E', selectedDayTextColor: '#DB7C2E', arrowColor: '#DB7C2E', textSectionTitleColor: '#CE5263' }}
        />
      </View>
      {todoTasks.length > 0 ? (
        <View height={'40%'} flex={1}>
          <Text fontWeight={'bold'} fontSize={20} mb={10}>Todo Tasks</Text>
          <FlatList
            data={todoTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text textAlign='center' my={40}>No tasks for today</Text>
      )}
      {completedTasks.length > 0 && (
        <View mt={10} flex={1}>
          <Text fontWeight={'bold'} fontSize={20} mb={10}>Completed Tasks</Text>
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default Home;
