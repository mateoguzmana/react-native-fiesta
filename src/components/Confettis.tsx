import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  processTransform2d,
  Rect,
  useComputedValue,
  useTiming,
  vec,
} from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';
import { screenHeight } from '../constants/dimensions';

const optimalNumberOfConfettis = 30;

function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export interface ConfettisProps
  extends Pick<ConfettiProps, 'size' | 'duration'> {
  autoHide?: boolean;
  theme?: string[];
  numberOfConfettis?: number;
}

export const Confettis = memo(
  ({
    theme = FiestaThemes.Default,
    numberOfConfettis = optimalNumberOfConfettis,
  }: ConfettisProps) => {
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

interface ConfettiProps {
  initialPosition?: { x: number; y: number };
  color?: string;
  index?: number;
  size?: number;
  /**
   * Duration of the animation in milliseconds
   * @default 6000
   */
  duration?: number;
}

const DEFAULT_ANIMATION_DURATION = 6000;

export const Confetti = memo(
  ({
    initialPosition = { x: 0, y: 0 },
    color = '#fff',
    index = 0,
    size = 30,
    duration = DEFAULT_ANIMATION_DURATION,
  }: ConfettiProps) => {
    const randomDuration = useMemo(
      () => randomIntFromInterval(duration, duration * 1.5),
      [duration]
    );

    const yPosition = useTiming(
      {
        from: -screenHeight / 2 + initialPosition.y,
        to: screenHeight + 300,
      },
      { duration: randomDuration }
    );

    const xOrigin = useTiming(
      {
        from: initialPosition.x,
        to: initialPosition.x + randomIntFromInterval(100, 50),
        loop: true,
        yoyo: true,
      },
      { duration: randomDuration }
    );

    const origin = useComputedValue(() => {
      return vec(xOrigin.current, yPosition.current);
    }, [yPosition, xOrigin]);

    const rotateValue = useTiming(
      {
        from: 0,
        to: degreesToRadians(Math.random() < 0.5 ? -360 : 360),
        loop: true,
      },
      { duration: randomDuration / 2 }
    );

    const scaleYValue = useTiming(
      {
        from: Math.random() < 0.5 ? -0.5 : 0.5,
        to: 0,
        loop: true,
        yoyo: true,
      },
      { duration: randomDuration / 2 }
    );

    const matrix = useComputedValue(
      () =>
        processTransform2d([
          { rotate: rotateValue.current },
          { scaleY: scaleYValue.current },
          { skewX: scaleYValue.current / 2 },
          { skewY: -scaleYValue.current / 2 },
        ]),
      [rotateValue, scaleYValue]
    );

    return (
      <Group origin={origin} matrix={matrix} key={index}>
        <Rect
          x={initialPosition.x}
          y={yPosition}
          width={size / 3}
          height={size}
          color={color}
        />
      </Group>
    );
  }
);

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
