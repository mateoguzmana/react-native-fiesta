import React, { memo, useEffect } from 'react';
import {
  Circle,
  Group,
  Oval,
  Path,
  processTransform2d,
} from '@shopify/react-native-skia';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';
import {
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

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
    const opacity = useSharedValue(1);
    const stringRotation = useSharedValue(-0.05);

    useEffect(() => {
      opacity.value = withSpring(autoPlay ? 0 : 1, singleItemFadeSpeed);

      stringRotation.value = withRepeat(withSpring(0.05), -1, true);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay]);

    // @TODO: the transformations are not working as expected
    const matrix = processTransform2d([
      { scale: depth },
      { translateX: x },
      { translateY: y },
      { rotate: stringRotation.value },
    ]);

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
