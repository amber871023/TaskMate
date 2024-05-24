import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { View, Text, Box, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import textStyles from '../constants/textStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';


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
    { id: 4, text: 'Hit the gym', completed: false, date: '2024-05-24' },
    { id: 5, text: 'Meeting w/ BBC', completed: true, date: '2024-05-23' },
  ]);

  const handleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };
  const handleEditTask = (id) => {
    // Handle edit task logic here
  };


  const renderTask = ({ item }) => (
    <Box style={styles.task} mb={10} backgroundColor='white' borderRadius={15}>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
            <Ionicons
              name={item.completed ? 'checkbox-outline' : 'square-outline'}
              size={20}
              color={item.completed ? '#FAB81B' : '#CE5263'}
            />
          </TouchableOpacity>
          <Text style={[styles.taskInfo, textSize === 'small' ? textStyles.smallText : textStyles.largeText, { marginLeft: 10 }]}>
            {item.text}
          </Text>
        </HStack>
        <Text>test</Text>
        <TouchableOpacity onPress={() => handleEditTask(item.id)}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </HStack>
    </Box>
  );

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <GlobalLayout>
      <Text my={10} style={[styles.heading, { color: '#CE5263' }]}>Hi, UserName</Text>
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
      <View style={{ borderRadius: 15, overflow: 'hidden' }}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#DB7C2E',
            selectedDayTextColor: '#DB7C2E',
            arrowColor: '#DB7C2E',
            textSectionTitleColor: '#CE5263',
          }}
        />
      </View>
      {incompleteTasks.length > 0 ? (
        <View>
          <Text style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Todo Tasks</Text>
          <FlatList
            data={incompleteTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            marginTop={10}
          />
        </View>
      ) : (
        <Text style={styles.noTasks}>There are no tasks to be done on this day</Text>
      )}
      {completedTasks.length > 0 && (
        <View>
          <Text style={[styles.taskSectionHeader, { color: colorTheme === 'dark' ? '#fff' : '#a0a0a0' }]}>Completed Tasks</Text>
          <FlatList
            data={completedTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            marginTop={10}
          />
        </View>
      )}
    </GlobalLayout>
  );
}

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskInfo: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#e1e1e1',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  completedTime: {
    fontSize: 14,
  },
  noTasks: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 40,
  },
  taskSectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 10,
  },
});
