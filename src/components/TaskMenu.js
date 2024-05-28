import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Menu, MenuItem, MenuItemLabel } from "@gluestack-ui/themed";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TaskMenu = ({ onEdit, onDelete }) => (
  <Menu
    placement="bottom end"
    style={styles.menu}
    trigger={({ ...triggerProps }) => {
      return (
        <Button {...triggerProps} bgColor='white'>
          <MaterialIcons name="more-horiz" size={24} color="#938989" />
        </Button>
      )
    }}
  >
    <MenuItem key="Edit" textValue="Edit" onPress={onEdit}>
      <MaterialIcons name="edit" size={18} color="#938989" />
      <MenuItemLabel size="sm" ml={5}>Edit</MenuItemLabel>
    </MenuItem>
    <MenuItem key="Delete" textValue="Delete" onPress={onDelete}>
      <MaterialIcons name="delete" size={18} color="#938989" />
      <MenuItemLabel size="sm" ml={5}>Delete</MenuItemLabel>
    </MenuItem>
  </Menu>
);

const styles = StyleSheet.create({
  menu: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
});

export default TaskMenu;
