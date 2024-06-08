import React, { memo, useEffect, useMemo } from 'react';
import { processTransform2d, Rect, vec } from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { degreesToRadians, randomIntFromInterval } from '../utils/confettis';
import { DEFAULT_ANIMATION_DURATION } from './Confettis';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const origin = useDerivedValue(
      () => vec(xOrigin.value, yPosition.value),
      [yPosition, xOrigin]
    );

    // @TODO: the skew values are not working as expected
    const matrix = processTransform2d([
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
        matrix={matrix}
        key={index}
      />
    );
  }
);
