import React, {
  memo,
  //  useMemo
} from 'react';
import {
  // processTransform2d,
  Rect,
  // useComputedValue,
  // useTiming,
  // vec,
} from '@shopify/react-native-skia';
// import { screenHeight } from '../constants/dimensions';
// import { degreesToRadians, randomIntFromInterval } from '../utils/confettis';
// import { DEFAULT_ANIMATION_DURATION } from './Confettis';

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
  }: // duration = DEFAULT_ANIMATION_DURATION,
  ConfettiProps) => {
    // const randomDuration = useMemo(
    //   () => randomIntFromInterval(duration, duration * 1.5),
    //   [duration]
    // );

    // const yPosition = useTiming(
    //   {
    //     from: -screenHeight / 2 + initialPosition.y,
    //     to: screenHeight + 300,
    //   },
    //   { duration: randomDuration }
    // );

    // const xOrigin = useTiming(
    //   {
    //     from: initialPosition.x,
    //     to: initialPosition.x + randomIntFromInterval(100, 50),
    //     loop: true,
    //     yoyo: true,
    //   },
    //   { duration: randomDuration }
    // );

    // const origin = useComputedValue(() => {
    //   return vec(xOrigin.current, yPosition.current);
    // }, [yPosition, xOrigin]);

    // const rotateValue = useTiming(
    //   {
    //     from: 0,
    //     to: degreesToRadians(Math.random() < 0.5 ? -360 : 360),
    //     loop: true,
    //   },
    //   { duration: randomDuration / 2 }
    // );

    // const scaleYValue = useTiming(
    //   {
    //     from: Math.random() < 0.5 ? -0.5 : 0.5,
    //     to: 0,
    //     loop: true,
    //     yoyo: true,
    //   },
    //   { duration: randomDuration / 2 }
    // );

    // const matrix = useComputedValue(
    //   () =>
    //     processTransform2d([
    //       { rotate: rotateValue.current },
    //       { scaleY: scaleYValue.current },
    //       { skewX: scaleYValue.current / 2 },
    //       { skewY: -scaleYValue.current / 2 },
    //     ]),
    //   [rotateValue, scaleYValue]
    // );

    return (
      <Rect
        x={initialPosition.x}
        // y={yPosition}
        width={size / 3}
        height={size}
        color={color}
        // origin={origin}
        // matrix={matrix}
        key={index}
      />
    );
  }
);
