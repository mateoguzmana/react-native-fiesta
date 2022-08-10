import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

interface ContentProps {
  lightMode: boolean;
  setLightMode: () => void;
}

function Content({lightMode, setLightMode}: ContentProps) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.title,
            lightMode ? styles.textLightColor : styles.textDarkColor,
          ]}>
          Dark
        </Text>
        <Switch
          onValueChange={setLightMode}
          value={lightMode}
          style={styles.switch}
        />
        <Text
          style={[
            styles.title,
            lightMode ? styles.textLightColor : styles.textDarkColor,
          ]}>
          Light
        </Text>
      </View>
      <Text
        style={[
          styles.title,
          lightMode ? styles.textLightColor : styles.textDarkColor,
        ]}>
        Hello, congrats for being here today! 🥳
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
  darkMode: {
    backgroundColor: 'black',
  },
  lightMode: {
    backgroundColor: 'white',
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
  textLightColor: {color: 'black'},
  textDarkColor: {color: 'white'},
  contentContainer: {
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Content;
