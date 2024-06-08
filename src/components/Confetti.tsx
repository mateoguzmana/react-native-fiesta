import React, { memo, useEffect, useMemo } from 'react';
import { Rect, vec } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { screenHeight } from '../constants/dimensions';
import { degreesToRadians, randomIntFromInterval } from '../utils/confettis';
import { DEFAULT_ANIMATION_DURATION } from './Confettis';

export interface ConfettiProps {
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

    const yPosition = useSharedValue(-screenHeight / 2 + initialPosition.y);
    const xOrigin = useSharedValue(initialPosition.x);
    const rotateValue = useSharedValue(0);
    const scaleYValue = useSharedValue(Math.random() < 0.5 ? -0.5 : 0.5);

    useEffect(() => {
      yPosition.value = withTiming(screenHeight + 300, {
        duration: randomDuration,
      });

      xOrigin.value = withRepeat(
        withTiming(initialPosition.x + randomIntFromInterval(100, 50), {
          duration: randomDuration,
        }),
        -1,
        true
      );

      rotateValue.value = withRepeat(
        withTiming(degreesToRadians(Math.random() < 0.5 ? -360 : 360), {
          duration: randomDuration / 2,
        }),
        -1,
        true
      );

      scaleYValue.value = withRepeat(
        withTiming(0, { duration: randomDuration / 2 }),
        -1,
        true
      );
    }, [
      initialPosition.x,
      randomDuration,
      rotateValue,
      scaleYValue,
      xOrigin,
      yPosition,
    ]);

    const origin = useDerivedValue(
      () => vec(xOrigin.value, yPosition.value),
      [yPosition, xOrigin]
    );

    const matrix = useDerivedValue(() => [
      { scaleY: scaleYValue.value },
      { rotate: rotateValue.value },
      { skewX: scaleYValue.value / 2 },
      { skewY: -scaleYValue.value / 2 },
    ]);

    return (
      <Rect
        x={initialPosition.x}
        y={yPosition}
        width={size / 3}
        height={size}
        color={color}
        origin={origin}
        transform={matrix}
        key={index}
      />
    );
  }
);
