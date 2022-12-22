import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Rect } from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';

const optimalNumberOfConfettis = 20;

export interface ConfettisProps {
  autoHide?: boolean;
  theme?: string[];
  numberOfConfettis?: number;
}

export const Confettis = memo(
  ({
    theme = FiestaThemes.Default,
    numberOfConfettis = optimalNumberOfConfettis,
  }: ConfettisProps) => {
    const fireworksToRenderArray = useMemo(
      () => [...Array(numberOfConfettis)],
      [numberOfConfettis]
    );
    const colors = useMemo(
      () => colorsFromTheme(theme, numberOfConfettis),
      [numberOfConfettis, theme]
    );

    const positions = useMemo(
      () => generateRandomCoordinates(numberOfConfettis),
      [numberOfConfettis]
    );

    return (
      <Canvas style={styles.canvas} pointerEvents="none">
        {fireworksToRenderArray.map((_, index) => (
          <Rect
            x={positions[index]?.x ?? 0}
            y={positions[index]?.y ?? 0}
            width={8}
            height={14}
            color={colors[index]}
            key={index}
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
