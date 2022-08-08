import React, {useEffect, useState} from 'react';
import {
  Canvas,
  Circle,
  FitBox,
  Group,
  Line,
  Oval,
  Path,
  Rect,
  rect,
  runSpring,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import {SpringConfig} from '@shopify/react-native-skia/lib/typescript/src/animation/spring/types';

const App = () => {
  const [lightMode, setLightMode] = useState(false);

  return (
    <View
      style={[
        styles.container,
        lightMode ? styles.lightMode : styles.darkMode,
      ]}>
      <View style={styles.contentContainer}>
        <Switch
          onValueChange={() => setLightMode(mode => !mode)}
          value={lightMode}
        />
        <Text
          style={[
            styles.title,
            lightMode ? styles.textLightColor : styles.textDarkColor,
          ]}>
          Hello, congrats for being here today! 🥳
        </Text>
      </View>

      <Birthday />
    </View>
  );
};

interface BirthdayProps {
  theme?: typeof FiestaThemes['default'] | typeof FiestaThemes['dark'];
}

function Birthday({theme = FiestaThemes.default}: BirthdayProps) {
  const X_GAP = 60;
  const yPositions = [150, 0, 300, 100, 200, 0, 200, 100, 300, 0];
  const possibleRadius = [30, 35, 40, 45];

  const optimalNumberOfBalloons = Math.floor(
    Dimensions.get('window').width / X_GAP,
  );

  // @ts-ignore
  const colors = Object.keys(theme).map(key => theme[key]);

  const randomisedColors = shuffleArray(colors);

  const renderBalloons = () => {
    return [...Array(optimalNumberOfBalloons)].map((_, index) => (
      <Balloon
        key={Math.random()}
        x={X_GAP * index}
        y={yPositions[index]}
        color={randomisedColors[index]}
        r={possibleRadius[Math.floor(Math.random() * possibleRadius.length)]}
      />
    ));
  };

  return <Canvas style={styles.canvas}>{renderBalloons()}</Canvas>;
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
  textLightColor: {color: 'black'},
  textDarkColor: {color: 'white'},
  contentContainer: {
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

const screenHeight: number = Dimensions.get('screen').height;

export default App;

interface BalloonProps {
  x: number;
  y?: number;
  color: BalloonColors;
  r?: number;
}

const Balloon = ({x, y = 0, color, r = 40}: BalloonProps) => {
  const bottomPos = -350;
  const shadowPosition = useValue(screenHeight - 315 - bottomPos + y);
  const mainBalloonPosition = useValue(screenHeight - 300 - bottomPos + y);
  const stringPosition = useValue(screenHeight - 265 - bottomPos + y);

  const springOptions: SpringConfig = {
    stiffness: 0.2,
    mass: 1,
  };

  const changeShadowPosition = () =>
    runSpring(shadowPosition, -screenHeight, springOptions);
  const changeMainBalloonPosition = () =>
    runSpring(mainBalloonPosition, -screenHeight, springOptions);
  const changeStringPosition = () =>
    runSpring(stringPosition, -screenHeight, springOptions);

  const pushBalloon = () => {
    changeShadowPosition();
    changeMainBalloonPosition();
    changeStringPosition();
  };

  useEffect(() => {
    pushBalloon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skewXValues = [0.1, 0, -0.1];
  const skewX = skewXValues[Math.floor(Math.random() * skewXValues.length)];

  return (
    <Group transform={[{skewX}]}>
      <Rect
        x={48 + x}
        y={stringPosition}
        width={3}
        height={100}
        color={stringColor}
      />

      <Circle cx={50 + x} cy={mainBalloonPosition} r={r} color={color} />

      <Circle
        cx={65 + x}
        cy={shadowPosition}
        r={r / 4}
        color="rgba(246, 243, 245, 0.5)"
      />
    </Group>
  );
};

enum BalloonColors {
  red = 'rgba(238, 17, 131, 1)',
  blue = 'rgba(0, 0, 255, 1)',
  green = 'rgba(0, 255, 0, 1)',
  yellow = 'rgba(255, 255, 0, 1)',
  purple = 'rgba(255, 0, 255, 1)',
  orange = 'rgba(255, 165, 0, 1)',
  pink = 'rgba(255, 192, 203, 1)',
}

enum DarkBalloonColors {
  black = 'rgba(0, 0, 0, 0.9)',
  black2 = 'rgba(0, 0, 0, 0.9)',
  black3 = 'rgba(0, 0, 0, 0.9)',
  black4 = 'rgba(0, 0, 0, 0.9)',
  black5 = 'rgba(0, 0, 0, 0.9)',
  black6 = 'rgba(0, 0, 0, 0.9)',
}

const FiestaThemes = {
  default: BalloonColors,
  dark: DarkBalloonColors,
};

const stringColor = 'rgba(245, 229, 27, 0.5)';

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}
