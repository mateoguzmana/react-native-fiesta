import React from 'react';
import {Canvas} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import Balloon from './Balloon';

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

export default Birthday;

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

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

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}
