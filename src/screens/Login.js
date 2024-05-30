import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { View, Text, Button, Box, Image } from '@gluestack-ui/themed';
import { GlobalLayout } from "../constants/GlobalLayout";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const basePlatformUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://192.168.0.101:3000';
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    // Validate username only if it's a registration
    if (isRegister && !username) {
      newErrors.username = 'Username is required';
    }
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission (login or register)
  const handleSubmit = async () => {
    if (!validateForm()) return;
    const url = isRegister ? `${basePlatformUrl}/users/register` : `${basePlatformUrl}/users/login`;
    // Prepare the payload
    const payload = isRegister ? { username, password, email } : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.msg || (isRegister ? 'Registration failed' : 'Login failed');
        throw new Error(errorMessage);

      }
      onLogin({ username: data.username, token: data.token });// Pass the username and token to the parent component
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <GlobalLayout>
      <Box style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} alt="logo" />
        <Text style={styles.title}>Welcome to TaskMate</Text>
        {/*  Username */}
        {errors.name && <Text color='#CE5263' mb={5}>{errors.name}</Text>}
        {isRegister && (
          < TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            style={[styles.input, errors.username && styles.errorInput]}
          />
        )}
        {/* Email */}
        {errors.email && <Text color='#CE5263' mb={5}>{errors.email}</Text>}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={[styles.input, errors.email && styles.errorInput]}
        />
        {/* Password */}
        {errors.password && <Text color='#CE5263' mb={5}>{errors.password}</Text>}
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={[styles.input, errors.password && styles.errorInput]}
        />
        {/* Submit login/register button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text color='white' textAlign='center' fontWeight={'bold'} fontSize={20}>
            {isRegister ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
        {/* Toggle between login and register */}
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
  errorInput: {
    borderColor: '#CE5263',
    borderWidth: 2,
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
