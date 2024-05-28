import React, { useState } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { HStack, View, Text, VStack, Button } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTaskModal = ({ visible, onClose, token }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState('');
  const [priority, setPriority] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const colors = ['#CE5263', '#FFB533', '#58AD60', '#62AAED', '#5275CE', '#B571FA'];
  const priorities = ['High', 'Medium', 'Low'];

  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://192.168.0.101';
  const url = `${basePlatformUrl}:3000/users/tasks`;

  const handleSubmit = async () => {
    // Validate the inputs
    if (!title) {
      alert('Please enter a task title');
      return;
    }
    if (!selectedColor) {
      alert('Please select a task color');
      return;
    }
    if (!priority) {
      alert('Please select a task priority');
      return;
    }

    // Format the date to 'YYYY-MM-DD'
    const formattedDate = date.toISOString().split('T')[0];

    // Create the task
    const task = { title, date: formattedDate, color: selectedColor, priority, completed: 0 };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });
      if (response.status === 401) {
        throw new Error('Authorization failed');
      }
      if (!response.ok) {
        throw new Error('Task creation failed');
      }

      const data = await response.json();
      console.log('Task created:', data);

      // Clear the inputs
      setTitle('');
      setDate(new Date());
      setSelectedColor('');
      setPriority('');

      // Close the modal
      onClose();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set') {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      }
      setShowDatePicker(false); // Hide the date/time picker for Android
    } else {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
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
            <Text style={styles.modalTitle}>Create Task</Text>

            <TouchableOpacity onPress={onClose} padding={10}>
              <AntDesign name="closesquareo" size={24} color="#938989" />
            </TouchableOpacity>
          </HStack>
          <VStack mb={20}>
            <Text fontWeight={'bold'} mb={5}>Title</Text>
            <TextInput
              placeholder="Enter task here"
              value={title}
              onChangeText={setTitle}
              fontSize={20}
              style={styles.textInput}
            />
          </VStack>
          <HStack alignItems='center' justifyContent='space-between' mb={20}>
            <Text fontWeight={'bold'}>Date</Text>
            {Platform.OS === 'android' && (
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text>{date.toDateString()}</Text>
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handleDateChange}
              />
            )}
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
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
          <HStack alignItems='center' justifyContent='space-between' mb={20}>
            <Text fontWeight={'bold'}>Priority</Text>
            <TouchableOpacity onPress={() => setSelectOpen(!selectOpen)} style={styles.select}>
              <Text textAlign='right' pr={10} fontWeight={'bold'}>{priority || 'Select priority'}</Text>
            </TouchableOpacity>
          </HStack>
          {selectOpen && (
            <VStack style={styles.selectOptions}>
              {priorities.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setPriority(item);
                    setSelectOpen(false);
                  }}
                >
                  <Text textAlign='right' pb={3}>{item}</Text>
                </TouchableOpacity>
              ))}
            </VStack>
          )}
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dateButton: {
    borderRadius: 10,
    backgroundColor: '#F1F0F0',
    padding: 8,
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
  select: {
    borderRadius: 10,
    backgroundColor: '#F1F0F0',
    position: 'relative',
    paddingVertical: 8,
    width: '43%',
  },
  selectOptions: {
    position: 'absolute',
    bottom: 45,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 999,
    width: '43%',
  },
});

export default CreateTaskModal;
