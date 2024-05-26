import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, VStack, HStack, Text, Divider, Badge, BadgeText } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons'; // corrected import
import TaskMenu from './TaskMenu';
import textStyles from '../constants/textStyles';
import moment from 'moment';

export const TaskItem = ({ item, handleTaskCompletion, handleEditTask, handleDeleteTask, textSize }) => (
  <Box style={styles.taskContainer} mb={10}>
    <HStack mb={10} backgroundColor='white' borderRadius={15}>
      <Box w={'2%'} style={[styles.colorBar, { backgroundColor: item.color }]} />
      <VStack w={'97%'} p={10}>
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
          <Badge size="md" variant="solid" borderRadius="$none" action={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'info'}>
            <BadgeText action="warning"> {item.priority} </BadgeText>
          </Badge>
          <Text fontSize={14} fontWeight={'bold'} color='grey'>{`${moment(item.date).format('DD MMM, YYYY')}`}</Text>
        </HStack>
      </VStack>
    </HStack>
  </Box>
);

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
