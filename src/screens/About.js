import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';


function About() {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#fff' }]}>
      <Image source={require('../../assets/logo_text.png')} style={styles.logo} alt='logo text' />
      <Text style={[styles.heading, { color: colorTheme === 'dark' ? '#fff' : '#000' }]}>Welcome to TaskMate!</Text>
      <Text style={[styles.subheading, { color: colorTheme === 'dark' ? '#fff' : '#000' }]} >
        TaskMate is your ultimate productivity companion designed to help you manage your tasks and schedule with ease. Our application combines a powerful task manager with an intuitive calendar view, ensuring you stay on top of your commitments and deadlines.
      </Text>
      <Text style={[styles.subheading, { color: colorTheme === 'dark' ? '#fff' : '#000' }]} >
        Our goal is to enhance your productivity by providing a seamless and efficient way to manage your daily tasks and long-term projects. Whether you're a student, a professional, or simply someone who wants to stay organized, TaskMate is here to help you achieve yourOur goal is to enhance your productivity by providing a seamless and efficient way to manage your daily tasks and long-term projects. Whether you're a student, a professional, or simply someone who wants to stay organized, TaskMate is here to help you achieve your goals.
      </Text>
    </View>
  );
}

export default About;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 220,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
});
