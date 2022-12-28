import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';
import { screenHeight } from '../constants/dimensions';
import { Confetti, ConfettiProps } from './Confetti';

const optimalNumberOfConfettis = 30;
export const DEFAULT_ANIMATION_DURATION = 6000;

export interface ConfettisProps
  extends Pick<ConfettiProps, 'size' | 'duration'> {
  autoHide?: boolean;
  theme?: string[];
  /**
   * Number of confettis to render
   * @default 30
   */
  numberOfConfettis?: number;
}

export const Confettis = memo(
  ({
    theme = FiestaThemes.Default,
    numberOfConfettis = optimalNumberOfConfettis,
    duration = DEFAULT_ANIMATION_DURATION,
  }: ConfettisProps) => {
    const [displayCanvas, setDisplayCanvas] = useState(true);

    const confettisToRender = useMemo(
      () => [...Array(numberOfConfettis)],
      [numberOfConfettis]
    );

    const colors = useMemo(
      () => colorsFromTheme(theme, numberOfConfettis),
      [numberOfConfettis, theme]
    );

    const positions = useMemo(
      () => generateRandomCoordinates(numberOfConfettis, screenHeight / 2),
      [numberOfConfettis]
    );

    // Hide confettis after the animation is done
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDisplayCanvas(false);
      }, duration * 1.5);

      return () => clearTimeout(timeout);
    }, [duration]);

    if (!displayCanvas) return null;

    return (
      <Canvas style={styles.canvas} pointerEvents="none">
        {confettisToRender.map((_, index) => (
          <Confetti
            key={index}
            initialPosition={positions[index] ?? { x: 0, y: 0 }}
            color={colors[index] ?? 'red'}
            index={index}
          />
        ))}
      </Canvas>
    );
  }
);

const styles = StyleSheet.create({
  canvas: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
