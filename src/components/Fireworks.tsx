import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { screenHeight } from '../constants/dimensions';
import { getParticlesFinalPositionsArray } from '../utils/fireworks';
import { screenWidth } from '../constants/dimensions';
import Firework from './Firework';

const numberOfParticles = 18;
const radius = 80;
const particlesColors = FiestaThemes.default;
const optimalNumberOfBalloons = Math.floor(screenWidth / 60);
const particlesFinalPositions = getParticlesFinalPositionsArray(
  numberOfParticles,
  radius
);
const fireworksToRenderArray = [...Array(optimalNumberOfBalloons)];
const fireworksGroupTransform = [
  { translateY: screenHeight * 1.2, translateX: screenWidth / 2 },
];

export interface FireworksProps {
  autoHide?: boolean;
  particleRadius?: number;
}

function Fireworks({ autoHide, particleRadius }: FireworksProps) {
  return (
    <Canvas style={styles.canvas}>
      <Group transform={fireworksGroupTransform}>
        {fireworksToRenderArray.map((_, index) => (
          <Firework
            key={index}
            particlesFinalPositions={
              particlesFinalPositions[index] ?? { xValues: [], yValues: [] }
            }
            color={particlesColors[index] ?? '#000'}
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
