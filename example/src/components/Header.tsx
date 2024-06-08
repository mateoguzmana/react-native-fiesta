import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FiestaThemes } from 'react-native-fiesta';

interface HeaderProps {
  onPressThemeChange: () => void;
  theme: number;
}

function Header({ onPressThemeChange, theme }: HeaderProps) {
  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, styles.tryTitle]}>
        Try out some fiesta components 🥳
      </Text>

      <TouchableOpacity onPress={onPressThemeChange}>
        <Text style={[styles.title, styles.tryTitle]}>
          Current theme: {Object.keys(FiestaThemes)[theme]} ↓
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 20,
    color: 'white',
  },
  contentContainer: {
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tryTitle: {
    marginTop: 20,
  },
});

export default Header;
