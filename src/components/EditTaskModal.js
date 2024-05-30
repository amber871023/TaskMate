import React, { useState } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { HStack, View, Text, VStack } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';

const EditTaskModal = ({ visible, onClose, taskData, onSubmit }) => {
  const [title, setTitle] = useState(taskData.title || '');
  const [date, setDate] = useState(taskData.date ? new Date(taskData.date) : new Date());
  const [selectedColor, setSelectedColor] = useState(taskData.color || '');
  const [priority, setPriority] = useState(taskData.priority || '');
  const [selectOpen, setSelectOpen] = useState(false);
  const [completed, setCompleted] = useState(taskData.completed || 0);
  const [id, setId] = useState(taskData.id || 0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const colors = ['#CE5263', '#FFB533', '#58AD60', '#62AAED', '#5275CE', '#B571FA'];

  const saveChanges = () => {
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
    // date.setDate(date.getDate() + 1);
    // const formattedDate = date.toISOString().split('T')[0];
    const formattedDate = moment.utc(date).tz('Australia/Brisbane').format('YYYY-MM-DD');

    const editedTask = {
      id, title, color: selectedColor, priority, completed, date: formattedDate
    };
    onSubmit(editedTask);
    onClose();
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
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
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
            />
          </VStack>
          {/* Choose Date and set up DatePicker based on different platform*/}
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
          {/* Choose Color */}
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
          {/* Choose Priority */}
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
              onPress={saveChanges}>
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  select: {
    borderRadius: 10,
    backgroundColor: '#F1F0F0',
    position: 'relative',
    paddingVertical: 8,
    width: '40%',
  }, selectOptions: {
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
    width: '40%',
  },
});

export default EditTaskModal;
