import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { screenHeight } from '../constants/dimensions';
import { getParticlesFinalPositionsArray } from '../utils/fireworks';
import { screenWidth } from '../constants/dimensions';
import Firework from './Firework';
import { colorsFromTheme } from '../utils/colors';

const numberOfParticles = 18;
const radius = 80;
const optimalNumberOfFireworks = Math.floor(screenWidth / 60);
const particlesFinalPositions = getParticlesFinalPositionsArray(
  numberOfParticles,
  radius
);
const fireworksToRenderArray = [...Array(optimalNumberOfFireworks)];
const fireworksGroupTransform = [
  { translateY: screenHeight * 1.2, translateX: screenWidth / 2 },
];

export interface FireworksProps {
  autoHide?: boolean;
  particleRadius?: number;
  theme?: string[];
}

function Fireworks({
  autoHide,
  particleRadius,
  theme = FiestaThemes.Default,
}: FireworksProps) {
  const colors = useMemo(
    () => colorsFromTheme(theme, optimalNumberOfFireworks),
    [theme]
  );

  return (
    <Canvas style={styles.canvas}>
      <Group transform={fireworksGroupTransform}>
        {fireworksToRenderArray.map((_, index) => (
          <Firework
            key={index}
            particlesFinalPositions={
              particlesFinalPositions[index] ?? { xValues: [], yValues: [] }
            }
            color={colors[index]}
            autoHide={autoHide}
            particleRadius={particleRadius}
          />
        ))}
      </Group>
    </Canvas>
  );
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

export default memo(Fireworks);
