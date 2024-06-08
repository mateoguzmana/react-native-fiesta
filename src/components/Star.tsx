import React, { memo, useEffect, useMemo } from 'react';
import { Path, processTransform2d } from '@shopify/react-native-skia';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';

export interface StarProps {
  x: number;
  y: number;
  autoplay?: boolean;
  color?: string;
}

export const Star = memo(
  ({ x, y, autoplay = true, color = baseColors.yellow }: StarProps) => {
    const opacity = useSharedValue(1);

    const matrix = useMemo(
      () =>
        processTransform2d([
          { translateX: x },
          { translateY: y },
          { scale: 0.1 },
        ]),
      [x, y]
    );

    useEffect(() => {
      opacity.value = withSpring(autoplay ? 0 : 1, singleItemFadeSpeed);
    }, [autoplay, opacity]);

    return (
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color={color}
        opacity={opacity}
        matrix={matrix}
      />
    );
  }
);
