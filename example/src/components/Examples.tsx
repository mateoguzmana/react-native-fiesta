import React, { ReactChild, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { Canvas, useFont } from '@shopify/react-native-skia';

export function Examples() {
  const { runFiestaAnimation } = useFiesta();
  const font = useFont(require('../fonts/OpenMoji-Color.ttf'), 30);
  const [lightMode, setLightMode] = useState(false);
  const [componentToRender, setComponentToRender] = useState<ReactChild | null>(
    null
  );
  const textColor = lightMode ? styles.textLightColor : styles.textDarkColor;
  const theme = lightMode ? FiestaThemes.Dark : FiestaThemes.Halloween;

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
          <Canvas style={styles.canvas}>
            <Heart x={20} y={20} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Hearts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Stars theme={theme} />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Star x={25} y={30} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Stars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setComponentToRender(<Fireworks />)}
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(255, 0, 255, 0.4)"
              initialPosition={{ x: 50, y: 50 }}
              fireworkRadius={300}
              autoHide={false}
            />
          </Canvas>
          <Text style={[styles.pressableText, textColor]}>Fireworks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setComponentToRender(
              <EmojiPopper emojis={['🥳', '🪅', '🎉', '🍻']} font={font} />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Emoji emoji="🎉" x={15} y={50} autoHide={false} font={font} />
          </Canvas>

          <Text style={[styles.pressableText, textColor]}>Emoji Popper</Text>
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
