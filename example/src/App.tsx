import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Balloons,
  Fireworks,
  FiestaThemes,
  Stars,
  Hearts,
  Balloon,
  Star,
  Heart,
  Firework,
  getParticlesFinalPositions,
} from 'react-native-fiesta';
import Content from './components/Content';
import Button from './components/Button';
import { Canvas } from '@shopify/react-native-skia';

const numberOfParticles = 18;
const radius = 30;
const fireworksPositions = getParticlesFinalPositions(
  numberOfParticles,
  { x: 40, y: 40 },
  radius
);

function App() {
  const [lightMode, setLightMode] = useState(false);
  const [componentToRender, setComponentToRender] = useState(<Fireworks />);

  return (
    <SafeAreaView
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

      <View style={styles.column}>
        <TouchableOpacity
          onPress={() => {
            setComponentToRender(
              <Balloons
                theme={lightMode ? FiestaThemes.dark : FiestaThemes.default}
              />
            );
          }}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Balloon x={0} y={50} color={'blue'} depth={0.4} />
          </Canvas>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Stars />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Star x={5} y={30} autoplay={false} />
          </Canvas>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Hearts />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Heart x={0} y={20} autoplay={false} />
          </Canvas>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Hearts />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Firework
              color="blue"
              autoplay={false}
              particlesInitialPosition={{ x: 0, y: 50 }}
              particlesFinalposition={{
                xValues: fireworksPositions?.xValues ?? [],
                yValues: fireworksPositions?.yValues ?? [],
              }}
            />
          </Canvas>
        </TouchableOpacity>
      </View>

      {componentToRender}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  darkMode: {
    backgroundColor: 'black',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  canvas: {
    height: 80,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
  },
  pressable: {
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 0, 255, 0.4)',
    padding: 4,
    justifyContent: 'center',
  },
});

export default App;
