import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Balloons,
  Fireworks,
  FiestaThemes,
  Stars,
  Hearts,
  Balloon,
  Star,
  Heart,
} from 'react-native-fiesta';
import Content from './components/Content';
import Button from './components/Button';
import { Canvas } from '@shopify/react-native-skia';

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
        title="Fireworks"
        onPress={() => setComponentToRender(<Fireworks />)}
      />

      <View style={styles.row}>
        <Pressable
          onPress={() => {
            setComponentToRender(
              <Balloons
                theme={lightMode ? FiestaThemes.dark : FiestaThemes.default}
              />
            );
          }}
          style={styles.canvas}
        >
          <Canvas style={styles.canvas}>
            <Balloon x={20} y={50} color={'blue'} depth={0.4} />
          </Canvas>
        </Pressable>

        <Pressable
          onPress={() => setComponentToRender(<Stars />)}
          style={styles.canvas}
        >
          <Canvas style={styles.canvas}>
            <Star x={20} y={50} autoplay={false} />
          </Canvas>
        </Pressable>

        <Pressable
          onPress={() => setComponentToRender(<Hearts />)}
          style={styles.canvas}
        >
          <Canvas style={styles.canvas}>
            <Heart x={20} y={50} autoplay={false} />
          </Canvas>
        </Pressable>
      </View>

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
  canvas: {
    height: 100,
    width: 100,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
