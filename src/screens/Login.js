import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, Button, Box, Image, Alert } from '@gluestack-ui/themed';
import { GlobalLayout } from "../constants/GlobalLayout";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const url = isRegister ? 'https://your-api-url.com/register' : 'https://your-api-url.com/auth';
    const payload = isRegister ? { username, password, email } : { username, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(isRegister ? 'Registration failed' : 'Login failed');
      }

      const data = await response.json();
      onLogin(data);
    } catch (error) {
      Alert.alert('Error', error.message); // Use Alert directly for simplicity
    }
  };

  return (
    <GlobalLayout>
      <Box style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} alt="logo" />
        <Text style={styles.title}>Welcome to TaskMate</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        {isRegister && (
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
          />
        )}
        <Button onPress={handleSubmit} style={styles.button}>
          <Text color='white' textAlign='center' fontWeight={'bold'} fontSize={20}>
            {isRegister ? "Register" : "Login"}
          </Text>
        </Button>
        <View style={styles.toggleContainer}>
          <Text>{isRegister ? "Already have an account?" : "Don't have an account?"}</Text>
          <Button onPress={() => setIsRegister(!isRegister)} bgColor='transparent'>
            <Text style={styles.toggleButtonText}>
              {isRegister ? "Go to Login" : "Go to Register"}
            </Text>
          </Button>
        </View>
      </Box>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 180,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#DB7C2E',
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#EDEBEB',
  },
  button: {
    backgroundColor: '#CE5263',
    paddingVertical: 10,
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  toggleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#CE5263',
    fontSize: 16,
    textAlign: 'center',
  },
});
