import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Text, Box, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import textStyles from '../constants/textStyles';
import Tasks from './Tasks';

function Home({ navigation }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  console.log(selectedDate);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Meeting w/ BBC', time: '15:00 PM', completed: true, date: '2024-05-23' },
    { id: 2, text: 'Hit the gym', time: '10:30 AM', completed: false, date: '2024-05-23' },
    { id: 3, text: 'Meeting w/ BBC', time: '15:00 PM', completed: true, date: '2024-05-24' },
    { id: 4, text: 'Hit the gym', time: '10:30 AM', completed: false, date: '2024-05-23' },
    { id: 5, text: 'Meeting w/ BBC', time: '15:00 PM', completed: true, date: '2024-05-23' },

  ]);

  const handleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const renderTask = ({ item }) => (
    <Box style={styles.task} mb={10} backgroundColor='white' borderRadius={15}>
      <View>
        <Text style={[styles.taskInfo, textSize === 'small' ? textStyles.smallText : textStyles.largeText]}>
          {item.text}
        </Text>
        {item.completed && (
          <Text style={[styles.completedTime, textSize === 'small' ? textStyles.smallText : textStyles.largeText]}>
            Completed: {item.time}
          </Text>
        )}
      </View>
    </Box>
  );

  return (
    <GlobalLayout>
      <Text style={[styles.heading, { color: '#CE5263' }]}>Hi, UserName</Text>
      <HStack justifyContent='space-between' mb={10}>
        <Text style={[{ color: colorTheme === 'dark' ? '#fff' : '#000' }]} fontWeight={'bold'} fontSize={20}>
          {moment(selectedDate).isSame(moment(), 'day') ? "Today's Tasks" : `Tasks on ${moment(selectedDate).format('DD, MMM')}`}
        </Text>
        <Button
          variant="solid"
          bgColor="#DB7C2E"
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

      <FlatList
        data={tasks.filter((task) => task.date === selectedDate)}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        mb={15}
        theme={{
          // Customize calendar theme here
        }}
      />
    </GlobalLayout >
  );
}

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: '#a0a0a0',
  },
  noTasks: {
    textAlign: 'center',
    marginVertical: 30,
  },
});
