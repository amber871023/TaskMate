import React, { useState } from 'react';
import { Button, TextInput, Alert } from 'react-native';
import { GlobalLayout } from "../constants/GlobalLayout";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://your-api-url.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Call the onLogin function passed from the parent component
      // This could set a state variable to true indicating the user is logged in
      onLogin(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <GlobalLayout>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
    </GlobalLayout>
  );
}
