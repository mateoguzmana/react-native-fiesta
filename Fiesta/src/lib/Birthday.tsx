import React from 'react';
import {Canvas} from '@shopify/react-native-skia';
import {StyleSheet} from 'react-native';
import Balloon from './Balloon';
import {FiestaThemes} from './constants/theming';
import {screenWidth} from './constants/dimensions';

interface BirthdayProps {
  theme?: string[];
}

function Birthday({theme = FiestaThemes.dark}: BirthdayProps) {
  const X_GAP = 60;
  const yPositions = [150, 0, 300, 100, 200, 0, 200, 100, 300, 0];
  const possibleRadius = [30, 35, 40, 45];

  const optimalNumberOfBalloons = Math.floor(screenWidth / X_GAP);

  const randomisedColors = shuffleArray(theme);

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
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default Birthday;
