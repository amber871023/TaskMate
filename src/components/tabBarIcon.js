import * as React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { DarkTheme } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function TabBarIcon(props) {

  const IconComponent = props.library === 'Feather' ? Feather : FontAwesome;

  return (
    <IconComponent
      name={props.name}
      size={25}
      style={{ marginBottom: -3 }}
      color={props.focused ? DarkTheme.colors.primary : DarkTheme.colors.text}
    />
  );
}
