import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  processTransform2d,
  Rect,
  useComputedValue,
  useTiming,
  Easing,
  vec,
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

export interface ConfettisProps extends Pick<ConfettiProps, 'size'> {
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
      () => generateRandomCoordinates(numberOfConfettis, screenHeight / 2),
      [numberOfConfettis]
    );

    return (
      <Canvas style={styles.canvas} pointerEvents="none">
        {fireworksToRenderArray.map((_, index) => (
          <Confetti
            key={index}
            position={positions[index] ?? { x: 0, y: 0 }}
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
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

interface ConfettiProps {
  position: { x: number; y: number };
  color: string;
  index: number;
  size?: number;
}

const ANIMATION_DURATION = 6000;

const Confetti = memo(
  ({ position, color, index, size = 30 }: ConfettiProps) => {
    const randomDuration = useMemo(
      () => randomIntFromInterval(ANIMATION_DURATION, ANIMATION_DURATION * 1.5),
      []
    );

    const yPosition = useTiming(
      {
        from: -screenHeight / 2 + position.y,
        to: screenHeight + (Math.random() * screenHeight) / 2,
      },
      {
        duration: randomDuration,
        easing: Easing.inOut(Easing.ease),
      }
    );

    const origin = useComputedValue(() => {
      return vec(position.x, yPosition.current);
    }, [yPosition]);

    const rotateValue = useTiming(
      {
        from: 0,
        to: degreesToRadians(Math.random() < 0.5 ? -360 : 360),
        loop: true,
      },
      {
        duration: randomDuration / 2,
      }
    );

    const scaleYValue = useTiming(
      {
        from: Math.random() < 0.5 ? -0.5 : 0.5,
        to: 0,
        loop: true,
        yoyo: true,
      },
      {
        duration: randomDuration / 2,
      }
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
          x={position.x}
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
