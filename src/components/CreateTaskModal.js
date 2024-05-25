import React, { useState } from 'react';
import { Modal, TextInput, Button, StyleSheet } from 'react-native';
import { HStack, View, Text } from "@gluestack-ui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTaskModal = ({ visible, onClose }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [color, setColor] = useState('');
  const handleSubmit = () => {
    // Validate the inputs
    if (!title) {
      alert('Please enter a task title');
      return;
    }
    if (!color) {
      alert('Please select a task color');
      return;
    }
    // Create the task
    const task = { title, date, color };

    // Do something with the task, like adding it to your state or sending it to a server

    // Clear the inputs
    setTitle('');
    setDate(new Date());
    setColor('#000000');

    // Close the modal
    onClose();
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <HStack justifyContent='space-between'>
            <Text style={styles.modalTitle}>Create Task</Text>
            <Button title="close" onPress={onClose} />
          </HStack>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate || date)}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Color"
            value={color}
            onChangeText={setColor}
          />
          <HStack alignSelf='flex-end'>
            <Button title="Add Task" color='#CE5263' onPress={handleSubmit} />
          </HStack>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CreateTaskModal;
