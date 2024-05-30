import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { View, HStack, Text } from "@gluestack-ui/themed";
import ThemeContext from '../constants/ThemeContext';
import textStyles from '../constants/textStyles';
import licenses from '../../licenses.json'; // Adjust the path as necessary

function OpenSourceLicenses() {
  const { colorTheme, textSize } = useContext(ThemeContext);
  const [licenseData, setLicenseData] = useState([]);
  // Load license data from JSON file
  useEffect(() => {
    setLicenseData(licenses);
  }, []);

  const currentTextSizeStyle = textSize === 'Small' ? textStyles.smallText : textStyles.largeText;
  // Open the link in the browser
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorTheme === 'dark' ? '#2A2626' : '#F9F6F6' }]}>
      {Object.keys(licenseData).map((key, index) => (
        <View key={index} style={styles.licenseContainer}>
          <Text style={[currentTextSizeStyle, styles.licenseName]}>{key}</Text>
          <Text style={[currentTextSizeStyle, styles.licenseText]}>License: {licenseData[key].licenses}</Text>
          <HStack>
            {licenseData[key].repository && (
              <TouchableOpacity onPress={() => handleLinkPress(licenseData[key].repository)}>
                <Text style={[currentTextSizeStyle, styles.link]} pr={10}>Repository</Text>
              </TouchableOpacity>
            )}
            {licenseData[key].licenseUrl && (
              <TouchableOpacity onPress={() => handleLinkPress(licenseData[key].licenseUrl)}>
                <Text style={[currentTextSizeStyle, styles.link]}>License Details</Text>
              </TouchableOpacity>
            )}
          </HStack>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  licenseContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  licenseName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  licenseText: {
    fontSize: 14,
    marginBottom: 5,
  },
  link: {
    fontSize: 14,
    color: '#CE5263',
  },
});

export default OpenSourceLicenses;
