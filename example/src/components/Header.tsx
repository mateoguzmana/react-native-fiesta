import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Header() {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Hey, congrats for being here today! 🥳</Text>

      <Text style={[styles.title, styles.tryTitle]}>
        Try out some fiesta components
      </Text>
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
