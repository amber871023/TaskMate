import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Switch } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

function Settings({ navigation }) {
  const { colorTheme, toggleColorTheme } = useContext(ThemeContext);

  const [textSize, setTextSize] = useState('Small');

  const toggleTextSize = () => {
    setTextSize(textSize === 'Small' ? 'Large' : 'Small');
  };

  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#fff' }]}>
      {/* Accessibility */}
      <Text style={styles.title}>Accessibility</Text>
      <View style={styles.setting}>
        <Text style={[styles.settingText, { color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Text Size: {textSize}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#CE5263' }}
          thumbColor={textSize === 'Large' ? '#ffff' : '#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleTextSize}
          value={textSize === 'Large'}
        />
      </View>
      <View style={styles.setting}>
        <Text style={[styles.settingText, { color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Appearance: {colorTheme}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#CE5263' }}
          thumbColor={colorTheme === 'dark' ? '#ffff' : '#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleColorTheme}
          value={colorTheme === 'dark'}
        />
      </View>

      {/* App Info */}
      <Text style={styles.title} mt={10}>App Info</Text>
      <TouchableOpacity
        style={styles.setting}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={[styles.settingText, { color: colorTheme === 'dark' ? '#fff' : '#000' }]}>
          About TaskMate
        </Text>
        <FontAwesome name="angle-right" size={24} color="#CE5263" />
      </TouchableOpacity>

      <View style={styles.setting}>
        <Text style={[styles.settingText, { color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Open Source Licences</Text>
        <FontAwesome name="angle-right" size={24} color="#CE5263" />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText} color='#CE5263'>Log out</Text>
      </View>
    </View >
  );
}


export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#CE5263',
  },
});
