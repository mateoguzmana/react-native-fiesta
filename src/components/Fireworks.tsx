import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import { Firework, FireworkProps } from './Firework';
import { colorsFromTheme } from '../utils/colors';

const optimalNumberOfFireworks = 3;

export interface FireworksProps
  extends Pick<FireworkProps, 'numberOfParticles'> {
  autoHide?: boolean;
  particleRadius?: number;
  theme?: string[];
  fireworkRadius?: number;
  /**
   * For performance reasons, limiting the maximum number to 10
   * @default 3 - most performant number of fireworks
   */
  numberOfFireworks?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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

    const positions = useMemo(
      () => generateRandomCoordinates(numberOfFireworks),
      [numberOfFireworks]
    );

    return (
      <Canvas style={styles.canvas}>
        <Group>
          {fireworksToRenderArray.map((_, index) => (
            <Firework
              key={index}
              initialPosition={positions[index]}
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

function generateRandomCoordinates(
  numElements: number
): Array<{ x: number; y: number }> {
  // Create an array to store the generated coordinates
  const coordinates: Array<{ x: number; y: number }> = [];

  // Generate random x,y coordinates until we have the desired number of elements
  while (coordinates.length < numElements) {
    // Generate a random x,y coordinate
    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;

    // Check if the coordinate is unique
    let unique = true;
    for (const { x: prevX, y: prevY } of coordinates) {
      if (prevX === x && prevY === y) {
        unique = false;
        break;
      }
    }

    // If the coordinate is unique, add it to the array of coordinates
    if (unique) {
      coordinates.push({ x, y });
    }
  }

  return coordinates;
}
