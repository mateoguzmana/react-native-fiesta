import React, { ReactChild, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  EmojiPopper,
  Emoji,
} from 'react-native-fiesta';
import Content from './components/Content';
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
  const [componentToRender, setComponentToRender] = useState<ReactChild | null>(
    null
  );

  return (
    <SafeAreaView
      style={[styles.container, lightMode ? styles.lightMode : styles.darkMode]}
    >
      <Content
        lightMode={lightMode}
        setLightMode={() => setLightMode((mode) => !mode)}
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
            <Balloon x={50} y={50} color={'blue'} depth={0.4} />
          </Canvas>
          <Text
            style={[
              styles.pressableText,
              lightMode ? styles.textLightColor : styles.textDarkColor,
            ]}
          >
            Balloons
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Stars />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Star x={25} y={30} autoplay={false} />
          </Canvas>
          <Text
            style={[
              styles.pressableText,
              lightMode ? styles.textLightColor : styles.textDarkColor,
            ]}
          >
            Stars
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Hearts />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Heart x={20} y={20} autoplay={false} />
          </Canvas>
          <Text
            style={[
              styles.pressableText,
              lightMode ? styles.textLightColor : styles.textDarkColor,
            ]}
          >
            Hearts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Fireworks />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(255, 0, 255, 0.4)"
              particlesInitialPosition={{ x: 0, y: 50 }}
              particlesFinalPositions={{
                xValues: fireworksPositions?.xValues ?? [],
                yValues: fireworksPositions?.yValues ?? [],
              }}
              particleRadius={2}
              autoHide={false}
            />
          </Canvas>
          <Text
            style={[
              styles.pressableText,
              lightMode ? styles.textLightColor : styles.textDarkColor,
            ]}
          >
            Fireworks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setComponentToRender(<EmojiPopper emojis={['😀', '😊']} />)
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Emoji emoji="😀" x={15} y={50} autoplay={false} />
          </Canvas>

          <Text
            style={[
              styles.pressableText,
              lightMode ? styles.textLightColor : styles.textDarkColor,
            ]}
          >
            Emoji Popper
          </Text>
        </TouchableOpacity>
      </View>

      {componentToRender}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkMode: {
    backgroundColor: 'black',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  canvas: {
    height: 80,
    width: 100,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
  },
  pressable: {
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 0, 255, 0.4)',
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  pressableText: {
    color: 'white',
    fontSize: 20,
  },
  textLightColor: { color: 'black' },
  textDarkColor: { color: 'white' },
});

export default App;
