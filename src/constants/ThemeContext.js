import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('light');
  const [textSize, setTextSize] = useState('Small');

  // Load theme and text size from storage
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      const storedTextSize = await AsyncStorage.getItem('textSize');
      if (storedTheme) setColorTheme(storedTheme);
      if (storedTextSize) setTextSize(storedTextSize);
    })();
  }, []);

  const toggleColorTheme = async () => {
    const newTheme = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const toggleTextSize = async () => {
    const newSize = textSize === 'Small' ? 'Large' : 'Small';
    setTextSize(newSize);
    await AsyncStorage.setItem('textSize', newSize);
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleColorTheme, textSize, toggleTextSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
