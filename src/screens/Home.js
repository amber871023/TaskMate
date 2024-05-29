import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Text, HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { GlobalLayout } from "../constants/GlobalLayout";
import ThemeContext from '../constants/ThemeContext';
import TaskItem from '../components/TaskItem';
import { TasksContext } from '../constants/TasksContext';


function Home({ navigation, username, token }) {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const { tasks, fetchTasks, markedDates, selectedDate, setSelectedDate } = useContext(TasksContext);

  useEffect(() => {
    if (token) {
      fetchTasks(token);
    }
  }, [token, selectedDate]);

  const renderTask = ({ item }) => (
    <TaskItem
      item={item}
      textSize={textSize}
      token={token}
      onUpdate={() => fetchTasks(token)}
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
          theme={{ todayTextColor: '#CE5263', selectedDayTextColor: '#DB7C2E', arrowColor: '#DB7C2E', textSectionTitleColor: '#CE5263' }}
        />
      </View>
      {todoTasks.length > 0 ? (
        <View height={'40%'} flex={1}>
          <Text fontWeight={'bold'} fontSize={20} mb={10} style={[{ color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Todo Tasks</Text>
          <FlatList
            data={todoTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text fontSize={20} fontWeight={'bold'} textAlign='center' my={40} style={[{ color: colorTheme === 'dark' ? '#fff' : '#000' }]}>No tasks for today</Text>
      )}
      {completedTasks.length > 0 && (
        <View mt={10} flex={1}>
          <Text fontWeight={'bold'} fontSize={20} mb={10} style={[{ color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Completed Tasks</Text>
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
