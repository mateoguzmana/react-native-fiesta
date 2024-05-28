import React, { memo, useMemo } from 'react';
import { Path, processTransform2d } from '@shopify/react-native-skia';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';
import { withSpring } from 'react-native-reanimated';

export interface StarProps {
  x: number;
  y: number;
  autoplay?: boolean;
  color?: string;
}

export const Star = memo(
  ({ x, y, autoplay = true, color = baseColors.yellow }: StarProps) => {
    const opacity = withSpring(
      { to: autoplay ? 0 : 1, from: 1 },
      singleItemFadeSpeed
    );

    const matrix = useMemo(
      () =>
        processTransform2d([
          { translateX: x },
          { translateY: y },
          { scale: 0.1 },
        ]),
      [x, y]
    );

    return (
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color={color}
        opacity={opacity.to}
        matrix={matrix}
      />
    );
  }
);
