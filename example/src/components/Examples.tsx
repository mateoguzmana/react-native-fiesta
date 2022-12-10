import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Canvas, useFont } from '@shopify/react-native-skia';
import {
  Fireworks,
  FiestaThemes,
  Stars,
  Balloon,
  Star,
  Heart,
  Firework,
  EmojiPopper,
  Emoji,
  useFiesta,
  FiestaAnimations,
} from 'react-native-fiesta';
import Content from './Content';

export function Examples() {
  const { runFiestaAnimation } = useFiesta();
  const font = useFont(require('../fonts/OpenMoji-Color.ttf'), 30);
  const [lightMode, setLightMode] = useState(false);
  const [componentToRender, setComponentToRender] =
    useState<React.ReactNode | null>(null);
  // this dynamic key is mostly to allow executing the examples multiple times without avoiding re-rendering
  const [dynamicKey, setDynamicKey] = useState(0);
  const textColor = lightMode ? styles.textLightColor : styles.textDarkColor;
  const theme = lightMode ? FiestaThemes.Dark : FiestaThemes.Halloween;

  const onChangeComponent = useCallback((component: React.ReactNode) => {
    setDynamicKey((key) => key + 1);
    setComponentToRender(component);
  }, []);

  if (!font) return null;

  return (
    <View
      style={[styles.container, lightMode ? styles.lightMode : styles.darkMode]}
    >
      <Content
        lightMode={lightMode}
        setLightMode={() => setLightMode((mode) => !mode)}
      />

      <View style={styles.column}>
        {/* Example using Fiesta context */}
        <TouchableOpacity
          onPress={() =>
            runFiestaAnimation({ animation: FiestaAnimations.Balloons })
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Balloon x={50} y={50} color={'blue'} depth={0.4} />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Balloons</Text>
        </TouchableOpacity>

        {/* Example using Fiesta context */}
        <TouchableOpacity
          onPress={() =>
            runFiestaAnimation({ animation: FiestaAnimations.Hearts })
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Heart x={20} y={20} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Hearts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(<Stars theme={theme} key={dynamicKey} />)
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Star x={25} y={30} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Stars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <Fireworks numberOfFireworks={7} key={dynamicKey} />
            )
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(255, 0, 255, 0.4)"
              initialPosition={{ x: 50, y: 50 }}
              fireworkRadius={150}
              autoHide={false}
            />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Fireworks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <Fireworks
                numberOfFireworks={7}
                numberOfParticles={80}
                fireworkRadius={2000}
                particleRadius={0.1}
                key={dynamicKey}
              />
            )
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(164, 164, 164, 0.4)"
              initialPosition={{ x: 50, y: 50 }}
              fireworkRadius={450}
              numberOfParticles={70}
              autoHide={false}
            />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>
            Fireworks (extreme mode)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <EmojiPopper
                emojis={['🥳', '🪅', '🎉', '🍻']}
                font={font}
                direction="up"
                key={dynamicKey}
              />
            )
          }
          style={styles.pressable}
        >
          {/*@ts-ignore  - temporal, awaiting for the issue in rn-skia */}
          <Canvas style={styles.canvas}>
            <Emoji emoji="🎉" x={15} y={50} autoHide={false} font={font} />
          </Canvas>

          <Text
            style={[styles.pressableText, textColor]}
          >{`Emoji Popper (ascending)`}</Text>
        </TouchableOpacity>
      </View>

      {componentToRender}
    </View>
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
    borderColor: 'rgba(162, 162, 162, 0.3)',
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
