import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface ContentProps {
  lightMode: boolean;
  setLightMode(): void;
}

function Content({ lightMode, setLightMode }: ContentProps) {
  const textColor = lightMode ? styles.textLightColor : styles.textDarkColor;

  return (
    <View style={styles.contentContainer}>
      <View style={styles.switchContainer}>
        <Text style={[styles.title, textColor]}>Dark</Text>
        <Switch
          onValueChange={setLightMode}
          value={lightMode}
          style={styles.switch}
        />
        <Text style={[styles.title, textColor]}>Light</Text>
      </View>
      <Text style={[styles.title, textColor]}>
        Hey, congrats for being here today! 🥳
      </Text>

      <Text style={[styles.title, styles.tryTitle, textColor]}>
        Try out some fiesta components
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  switch: {
    marginTop: 18,
    marginHorizontal: 10,
  },
  textLightColor: { color: 'black' },
  textDarkColor: { color: 'white' },
  contentContainer: {
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tryTitle: {
    marginTop: 20,
  },
});

export default Content;
