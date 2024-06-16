import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Canvas, Circle, useFont } from '@shopify/react-native-skia';
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
  PopperDirection,
  Confettis,
  Confetti,
  Popper,
  WithEffect,
} from 'react-native-fiesta';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Header from './Header';

export function Examples() {
  const { runFiestaAnimation } = useFiesta();
  const { showActionSheetWithOptions } = useActionSheet();
  const font = useFont(require('../fonts/OpenMoji-Color.ttf'), 30);
  const insets = useSafeAreaInsets();

  const [componentToRender, setComponentToRender] =
    useState<React.ReactNode | null>(null);
  // this dynamic key is mostly to allow executing the examples multiple times allowing re-rendering
  const [dynamicKey, setDynamicKey] = useState(0);
  const [theme, setTheme] = useState(0);

  const onChangeComponent = useCallback((component: React.ReactNode) => {
    setDynamicKey((key) => key + 1);
    setComponentToRender(component);
  }, []);

  const onPressThemeChange = useCallback(() => {
    const options = Object.keys(FiestaThemes);
    showActionSheetWithOptions(
      {
        options,
      },
      (selectedIndex) => {
        if (selectedIndex) {
          setTheme(selectedIndex);
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const selectedTheme = useMemo(
    () =>
      FiestaThemes[
        Object.keys(FiestaThemes)[theme] as keyof typeof FiestaThemes
      ],
    [theme]
  );

  if (!font) return null;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Header onPressThemeChange={onPressThemeChange} theme={theme} />

      <ScrollView style={styles.column}>
        <WithEffect style={styles.withEffect}>
          <Text style={[styles.pressableText, styles.textColor]}>Effects</Text>
        </WithEffect>

        <TouchableOpacity
          onPress={() =>
            runFiestaAnimation({
              animation: FiestaAnimations.Balloons,
              theme: selectedTheme,
            })
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Balloon x={50} y={50} depth={0.4} autoPlay={false} />
          </Canvas>
          <Text style={[styles.pressableText, styles.textColor]}>
            Balloons (using Fiesta context)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            runFiestaAnimation({
              animation: FiestaAnimations.Hearts,
              theme: selectedTheme,
              direction: PopperDirection.Ascending,
              positionSpringConfig: {
                stiffness: 100,
                damping: 100,
                mass: 11000,
              },
              fadeSpringConfig: {
                stiffness: 1,
                damping: 1,
                mass: 1000,
              },
            })
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Heart x={20} y={20} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, styles.textColor]}>
            Hearts (using Fiesta context with options)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(<Stars theme={selectedTheme} key={dynamicKey} />)
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Star x={25} y={30} autoplay={false} />
          </Canvas>
          <Text style={[styles.pressableText, styles.textColor]}>Stars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <Fireworks
                numberOfFireworks={7}
                key={dynamicKey}
                theme={selectedTheme}
              />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(255, 0, 255, 0.4)"
              initialPosition={{ x: 50, y: 50 }}
              fireworkRadius={150}
              autoHide={false}
            />
          </Canvas>
          <Text style={[styles.pressableText, styles.textColor]}>
            Fireworks
          </Text>
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
                theme={selectedTheme}
              />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(164, 164, 164, 0.4)"
              initialPosition={{ x: 50, y: 50 }}
              fireworkRadius={450}
              numberOfParticles={70}
              autoHide={false}
            />
          </Canvas>
          <Text style={[styles.pressableText, styles.textColor]}>
            Fireworks (extreme mode)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <EmojiPopper
                emojis={['🥳', '🪅', '🎉', '🍻']}
                font={font}
                direction={PopperDirection.Ascending}
                key={dynamicKey}
                theme={selectedTheme}
              />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Emoji emoji="🎉" x={15} y={50} autoHide={false} font={font} />
          </Canvas>

          <Text style={[styles.pressableText, styles.textColor]}>
            Emoji Popper (ascending)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <Confettis theme={selectedTheme} key={dynamicKey} />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Confetti />
          </Canvas>

          <Text style={[styles.pressableText, styles.textColor]}>
            Confettis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChangeComponent(
              <Popper
                direction={PopperDirection.Ascending}
                theme={selectedTheme}
                key={dynamicKey}
                spacing={10}
                renderItem={({ x, y, colors }, index) => (
                  <Circle
                    key={`circle-${index}`}
                    cx={x}
                    cy={y}
                    r={10}
                    color={colors[index]}
                  />
                )}
                positionSpringConfig={{
                  stiffness: 100,
                  damping: 100,
                  mass: 11000,
                }}
                fadeSpringConfig={{
                  stiffness: 1,
                  damping: 1,
                  mass: 1000,
                }}
              />
            )
          }
          style={styles.pressable}
        >
          <Canvas style={styles.canvas}>
            <Circle cx={10} cy={10} r={20} color="rgba(255, 0, 255, 0.4)" />
          </Canvas>

          <Text style={[styles.pressableText, styles.textColor]}>
            Custom elements using Popper
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {componentToRender}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D31',
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
    borderColor: '#495579',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  pressableText: {
    color: 'white',
    fontSize: 20,
    maxWidth: '70%',
  },
  textColor: { color: 'white' },
  withEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginHorizontal: 8,
    padding: 10,
    alignSelf: 'center',
  },
});
