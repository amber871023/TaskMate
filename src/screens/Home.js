import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Text, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import { TaskItem } from '../components/TaskItem';

function Home({ navigation }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#FAB81B',
      selectedTextColor: '#fff',
    },
  };

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
    { id: 2, text: 'Hit the gym', completed: false, date: '2024-05-23' },
    { id: 3, text: 'Meeting w/ BBC', completed: true, date: '2024-05-24' },
    { id: 4, text: 'Hit the gym', completed: false, date: '2024-05-23' },
    { id: 5, text: 'Hit the gym', completed: false, date: '2024-05-24' },
    { id: 6, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
    { id: 7, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
    { id: 8, text: 'Hit the gym', completed: false, date: '2024-05-23' },


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

  const renderTask = ({ item }) => (
    <TaskItem
      item={item}
      handleTaskCompletion={handleTaskCompletion}
      handleEditTask={handleEditTask}
      handleDeleteTask={handleDeleteTask}
      textSize={textSize} //textSize is a prop passed to the component
    />
  );

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <GlobalLayout>
      <Text fontSize={24} fontWeight={'bold'} my={10} color='#CE5263'>Hi, UserName</Text>
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
          <ButtonText
            fontSize={16}
            color="white"
            textAlign="center"
          >
            All Tasks
          </ButtonText>
        </Button>
      </HStack>
      <View style={{ borderRadius: 15, overflow: 'hidden' }} mb={10}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          style={{
            height: 300
          }}
          theme={{
            todayTextColor: '#DB7C2E',
            selectedDayTextColor: '#DB7C2E',
            arrowColor: '#DB7C2E',
            textSectionTitleColor: '#CE5263',
          }}
        />
      </View>
      {incompleteTasks.length > 0 ? (
        <View height={'25%'}>
          <Text style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Todo Tasks</Text>
          <FlatList
            data={incompleteTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <Text my={20} textAlign='center' color='#a0a0a0'>No tasks for this day</Text>
      )}
      {
        completedTasks.length > 0 && (
          <View height={'18%'}>
            <Text mt={5} style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Completed Tasks</Text>
            <FlatList
              data={completedTasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )
      }
    </GlobalLayout >
  );
}

const styles = StyleSheet.create({
  taskSectionHeader: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Home;
