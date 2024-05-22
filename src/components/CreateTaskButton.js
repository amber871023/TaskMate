import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CreateTaskButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome5 name="plus-circle" size={26} color="#FFC700" />
      <Text style={styles.text} >Create Task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'coloumn',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  text: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});


export default CreateTaskButton;
