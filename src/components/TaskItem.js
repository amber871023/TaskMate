import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Box, VStack, HStack, Text, Divider, Badge, BadgeText } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import TaskMenu from './TaskMenu';
import textStyles from '../constants/textStyles';
import moment from 'moment';
import EditTaskModal from './EditTaskModal';

export const TaskItem = ({ item, handleTaskCompletion, handleEditTask, handleDeleteTask, textSize, token }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...item });

  const openEditModal = () => {
    setEditedTask({ ...item });
    setEditModalVisible(true);
  };

  const saveChanges = () => {
    // Implement logic to save the changes made to the task
    // For example, you can call the handleEditTask function with the modified task data
    handleEditTask(editedTask);
    setEditModalVisible(false);
  };

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://192.168.0.101';
  const handleCheckboxPress = async () => {
    try {
      // Toggle the completed status locally
      const updatedTask = { ...item, completed: !item.completed };
      setEditedTask(updatedTask);
      // Call the API to update the completed status
      const response = await fetch(`${basePlatformUrl}:3000/users/tasks/${item.id}/completed`, {
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

      // Call the handleTaskCompletion callback to update the task locally
      handleTaskCompletion(item.id);
    } catch (error) {
      console.error('Error updating task completed status:', error);
    }
  };

  return (
    <Box style={styles.taskContainer} mb={10}>
      <HStack mb={10} backgroundColor='white' borderRadius={15}>
        <Box w={'2%'} style={[styles.colorBar, { backgroundColor: item.color }]} />
        <VStack w={'97%'} p={10}>
          <HStack justifyContent='space-between' alignItems='center'>
            <HStack alignItems='center'>
              {/* Checkbox for tasks */}
              <TouchableOpacity onPress={() => handleCheckboxPress(item.id)}>
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
            <TaskMenu onEdit={openEditModal} onDelete={() => handleDeleteTask(item.id)} />
          </HStack>
          <Divider my="$1.5" />
          {/* Date */}
          <HStack justifyContent='space-between' alignItems='center' mx={5}>
            <Badge size="md" variant="solid" borderRadius="$none" action={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'info'}>
              <BadgeText action="warning"> {item.priority} </BadgeText>
            </Badge>
            <Text fontSize={14} fontWeight={'bold'} color='grey'>{`${moment(item.date).format('DD MMM, YYYY')}`}</Text>
          </HStack>
        </VStack>
      </HStack>

      {/* Edit Task Modal */}
      <EditTaskModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        taskData={editedTask} // Pass the task data here
        onSubmit={saveChanges}
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
