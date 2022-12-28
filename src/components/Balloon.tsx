import React, { memo } from 'react';
import {
  Circle,
  Group,
  Oval,
  Path,
  processTransform2d,
  useComputedValue,
  useTiming,
  Easing,
  useSpring,
} from '@shopify/react-native-skia';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';

export interface BalloonProps {
  x?: number;
  y?: number;
  color?: string;
  r?: number;
  depth?: number;
  autoPlay?: boolean;
}

export const Balloon = memo(
  ({
    x = 0,
    y = 0,
    color = '#A555EC',
    r = 40,
    depth = 1,
    autoPlay = true,
  }: BalloonProps) => {
    const opacity = useSpring(
      { to: autoPlay ? 0 : 1, from: 1 },
      singleItemFadeSpeed
    );

    const stringRotation = useTiming(
      {
        to: 0.05,
        from: -0.05,
        yoyo: true,
        loop: true,
      },
      { easing: Easing.linear }
    );

    const matrix = useComputedValue(
      () =>
        processTransform2d([
          { scale: depth },
          { translateX: x },
          { translateY: y },
          { rotate: stringRotation.current },
        ]),
      [stringRotation, x, y, depth, opacity]
    );

    return (
      <Group matrix={matrix} opacity={opacity}>
        <Path
          path={`M 100 22 C 90 10, 110 80, 100 100 S 100 170, 100 150`}
          color={baseColors.golden}
          style="stroke"
          strokeJoin="round"
          strokeWidth={5}
          transform={[{ translateX: -55 }]}
        />

        <Oval
          height={r * 2.3}
          width={r * 2}
          color={color}
          transform={[{ translateY: -50 }]}
        />

        <Circle
          cx={r / 0.8}
          cy={-25}
          r={r / 4}
          color={baseColors.gray}
          opacity={0.3}
        />
      </Group>
    );
  }
);
