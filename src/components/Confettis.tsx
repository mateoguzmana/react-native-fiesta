import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  processTransform2d,
  Rect,
  useComputedValue,
  useTiming,
} from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';
import { screenHeight } from '../constants/dimensions';

const optimalNumberOfConfettis = 20;

function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

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
      () => generateRandomCoordinates(numberOfConfettis, 100),
      [numberOfConfettis]
    );

    const rotateValue = useTiming({
      from: 0,
      to: degreesToRadians(360),
      loop: true,
    });

    const scaleYValue = useTiming({
      from: 1,
      to: 0,
      loop: true,
      yoyo: true,
    });

    const yPosition = useTiming(
      { from: screenHeight, to: 0 },
      { duration: 2000 }
    );

    const allTransforms = useComputedValue(
      () =>
        processTransform2d([
          { rotate: rotateValue.current },
          { scaleY: scaleYValue.current },
        ]),
      [rotateValue, scaleYValue]
    );

    return (
      <Canvas style={styles.canvas} pointerEvents="none">
        {fireworksToRenderArray.map((_, index) => (
          <Group
            origin={{
              x: positions[index]?.x ?? 0,
              y: positions[index]?.y ?? 0,
            }}
            matrix={allTransforms}
            key={index}
          >
            <Rect
              x={positions[index]?.x ?? 0}
              y={yPosition}
              width={8}
              height={14}
              color={colors[index]}
            />
          </Group>
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
