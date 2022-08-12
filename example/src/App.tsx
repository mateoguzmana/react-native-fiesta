import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Birthday, Fireworks, FiestaThemes, Stars } from 'react-native-fiesta';
import Content from './components/Content';
import Button from './components/Button';

function App() {
  const [lightMode, setLightMode] = useState(false);
  const [componentToRender, setComponentToRender] = useState(<Fireworks />);

  return (
    <View
      style={[styles.container, lightMode ? styles.lightMode : styles.darkMode]}
    >
      <Content
        lightMode={lightMode}
        setLightMode={() => setLightMode((mode) => !mode)}
      />

      <Button
        title="Birthday Balloons"
        onPress={() => {
          setComponentToRender(
            <Birthday
              theme={lightMode ? FiestaThemes.dark : FiestaThemes.default}
            />
          );
        }}
      />
      <Button
        title="Fireworks"
        onPress={() => setComponentToRender(<Fireworks />)}
      />

      <Button title="Stars" onPress={() => setComponentToRender(<Stars />)} />

      {componentToRender}
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
