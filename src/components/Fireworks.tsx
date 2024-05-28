import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { Firework, type FireworkProps } from './Firework';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';

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

export const Fireworks: React.FC<FireworksProps> = memo(
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
      <Canvas style={styles.canvas} pointerEvents="none">
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
      </Canvas>
    );
  }
);

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
