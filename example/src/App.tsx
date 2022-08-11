import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Birthday, Fireworks, FiestaThemes } from 'react-native-fiesta';
import Content from './components/Content';

function App() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <View
      style={[styles.container, lightMode ? styles.lightMode : styles.darkMode]}
    >
      <Content
        lightMode={lightMode}
        setLightMode={() => setLightMode((mode) => !mode)}
      />
      <Birthday
        theme={lightMode ? FiestaThemes.dark : FiestaThemes.default}
        autoplay={false}
      />

      <Fireworks />
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
});

export default App;
