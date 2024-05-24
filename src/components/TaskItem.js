import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, HStack, Text, Divider } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons'; // corrected import
import TaskMenu from './TaskMenu';
import textStyles from '../constants/textStyles';
import moment from 'moment';

export const TaskItem = ({ item, handleTaskCompletion, handleEditTask, handleDeleteTask, textSize }) => (
  <Box style={styles.task} mb={10} backgroundColor='white' borderRadius={15}>
    <HStack justifyContent='space-between' alignItems='center'>
      <HStack alignItems='center'>
        {/* Checkbox for tasks */}
        <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
          <Ionicons
            name={item.completed ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color={item.completed ? '#FAB81B' : '#CE5263'}
          />
        </TouchableOpacity>
        <Text style={[styles.taskInfo, textSize === 'small' ? textStyles.smallText : textStyles.largeText]}>
          {item.text}
        </Text>
      </HStack>
      <TaskMenu onEdit={() => handleEditTask(item.id)} onDelete={() => handleDeleteTask(item.id)} />
    </HStack>
    <Divider my="$1.5" />
    {/* Date */}
    <HStack justifyContent='space-between' alignItems='center' mx={5}>
      <Text fontWeight={'bold'} color='grey'>Date</Text>
      <Text fontSize={14} fontWeight={'bold'} color='grey'>{`${moment(item.date).format('DD MMM, YYYY')}`}</Text>
    </HStack>
  </Box>
);

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  taskInfo: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
