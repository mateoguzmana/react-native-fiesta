import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import { Firework, FireworkProps } from './Firework';
import { colorsFromTheme } from '../utils/colors';

const optimalNumberOfFireworks = 3;
const initialPositions = [
  { x: 100, y: -300 },
  { x: 150, y: -700 },
  { x: 200, y: -500 },
  { x: 250, y: -600 },
  { x: 300, y: -400 },
  { x: 250, y: -800 },
  { x: 200, y: -900 },
];

const fireworksGroupTransform = [
  { translateY: screenHeight * 1.2, translateX: screenWidth / 2 },
];

export interface FireworksProps
  extends Pick<FireworkProps, 'numberOfParticles'> {
  autoHide?: boolean;
  particleRadius?: number;
  theme?: string[];
  fireworkRadius?: number;
  /**
   * For performance reasons, limiting the maximum number to 7
   * @default 3 - most performant number of fireworks
   */
  numberOfFireworks?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const Fireworks = memo(
  ({
    autoHide,
    particleRadius,
    theme = FiestaThemes.Default,
    fireworkRadius = 400,
    numberOfFireworks = optimalNumberOfFireworks,
    ...rest
  }: FireworksProps) => {
    const fireworksToRenderArray = useMemo(
      () => [...Array(numberOfFireworks)],
      [numberOfFireworks]
    );
    const colors = useMemo(
      () => colorsFromTheme(theme, numberOfFireworks),
      [numberOfFireworks, theme]
    );

    return (
      // @ts-ignore
      <Canvas style={styles.canvas}>
        <Group transform={fireworksGroupTransform}>
          {fireworksToRenderArray.map((_, index) => (
            <Firework
              key={index}
              initialPosition={initialPositions[index]}
              color={colors[index]}
              autoHide={autoHide}
              particleRadius={particleRadius}
              fireworkRadius={fireworkRadius}
              {...rest}
            />
          ))}
        </Group>
      </Canvas>
    );
  }
);

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
