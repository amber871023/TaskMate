import React, { useState, useEffect } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, View, Text, VStack, Button, ButtonText } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTaskModal = ({ visible, onClose, taskData, onSubmit }) => {
  const [title, setTitle] = useState(taskData.title || '');
  const [date, setDate] = useState(taskData.date ? new Date(taskData.date) : new Date());
  const [selectedColor, setSelectedColor] = useState(taskData.color || '');

  const colors = ['#CE5263', '#FFB533', '#8DEF91', '#62AAED', '#5275CE', '#B571FA'];

  const handleSubmit = () => {
    // Validate the inputs
    if (!title) {
      alert('Please enter a task title');
      return;
    }
    if (!selectedColor) {
      alert('Please select a task color');
      return;
    }
    // Create the task
    const task = { title, date, color: selectedColor };

    // Do something with the task, like adding it to your state or sending it to a server

    // Clear the inputs
    setTitle('');
    setDate(new Date());
    setSelectedColor('');

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
          <HStack style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Task</Text>

            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <AntDesign name="closesquareo" size={24} color="#938989" p={10} />
            </TouchableOpacity>
          </HStack>
          <VStack mb={20}>
            <Text fontWeight={'bold'} mb={5}>Title</Text>
            <TextInput
              placeholder="Enter task here"
              value={title}
              onChangeText={setTitle}
              fontSize={20}
            />
          </VStack>
          <HStack alignItems='center' justifyContent='space-between' mb={20}>
            <Text fontWeight={'bold'}>Date</Text>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setDate(selectedDate || date)}
            />
          </HStack>
          <HStack alignItems='center' justifyContent='space-between' mb={10}>
            <Text fontWeight={'bold'}>Color</Text>
            <HStack justifyContent="space-between" mb={10}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorButton
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </HStack>
          </HStack>
          <HStack alignSelf='flex-end' mt={50}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
            >
              <Text color='white' textAlign='center' fontWeight={'bold'}>Save</Text>
            </TouchableOpacity>
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
  modalHeader: {
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CE5263',
  },
  colorButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#CE5263',
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default EditTaskModal;
