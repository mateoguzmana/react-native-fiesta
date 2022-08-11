import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#841584',
    padding: 4,
    margin: 10,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Button;
