import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Box, VStack, HStack, Text, Divider, Badge, BadgeText } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import TaskMenu from './TaskMenu';
import textStyles from '../constants/textStyles';
import moment from 'moment';
import EditTaskModal from './EditTaskModal';
import { TasksContext } from '../constants/TasksContext';

export const TaskItem = ({ item, textSize, token, onUpdate }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...item });
  const { fetchTasks } = useContext(TasksContext);


  const openEditModal = () => {
    setEditedTask({ ...item });
    setEditModalVisible(true);
  };
  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://192.168.0.101:3000';


  const handleEditTask = async (updatedTask) => {
    try {
      const response = await fetch(`${basePlatformUrl}/users/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        Alert.alert('Success', 'Task updated successfully');
        setEditModalVisible(false);
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleTaskCompletion = async () => {
    try {
      const updatedTask = { ...item, completed: !item.completed };

      const response = await fetch(`${basePlatformUrl}/users/tasks/${item.id}/completed`, {
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

      setEditedTask(updatedTask);
      onUpdate();
    } catch (error) {
      console.error('Error updating task completed status:', error);
      Alert.alert('Error', 'Failed to update task completion status. Please try again later.');
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`${basePlatformUrl}/users/tasks/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Task deleted successfully');
        fetchTasks(token);
        onUpdate();
      } else {
        Alert.alert('Error', 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  return (
    <Box style={styles.taskContainer} mb={10}>
      <HStack mb={10} backgroundColor='white' borderRadius={15}>
        <Box w={'2%'} style={[styles.colorBar, { backgroundColor: item.color }]} />
        <VStack w={'97%'} p={10}>
          <HStack justifyContent='space-between' alignItems='center'>
            <HStack alignItems='center'>
              <TouchableOpacity onPress={handleTaskCompletion}>
                <Ionicons
                  name={item.completed ? 'checkbox-outline' : 'square-outline'}
                  size={20}
                  color={item.completed ? '#FAB81B' : '#CE5263'}
                />
              </TouchableOpacity>
              <Text style={[styles.taskInfo, textSize === 'small' ? textStyles.smallText : textStyles.largeText]}>
                {item.title}
              </Text>
            </HStack>
            <TaskMenu onEdit={openEditModal} onDelete={handleDeleteTask} />
          </HStack>
          <Divider my="$1.5" />
          <HStack justifyContent='space-between' alignItems='center' mx={5}>
            <Badge size="md" variant="solid" borderRadius="$none" action={item.priority === 'High' ? 'error' : item.priority === 'Medium' ? 'warning' : 'info'}>
              <BadgeText action="warning"> {item.priority} </BadgeText>
            </Badge>
            <Text fontSize={14} fontWeight={'bold'} color='grey'>{`${moment(item.date).format('DD MMM, YYYY')}`}</Text>
          </HStack>
        </VStack>
      </HStack>

      <EditTaskModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        taskData={editedTask}
        onSubmit={handleEditTask}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInfo: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  colorBar: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default TaskItem;
