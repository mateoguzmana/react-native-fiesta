import React, { memo, useEffect, useMemo } from 'react';
import { Path, processTransform2d } from '@shopify/react-native-skia';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';
import { useSharedValue, withSpring } from 'react-native-reanimated';

export interface HeartProps {
  x: number;
  y: number;
  autoplay?: boolean;
  color?: string;
}

export const Heart = memo(
  ({ x, y, autoplay = true, color = baseColors.red }: HeartProps) => {
    const opacity = useSharedValue(1);

    const matrix = useMemo(
      () =>
        processTransform2d([
          { translateX: x },
          { translateY: y },
          { scale: 0.05 },
        ]),
      [x, y]
    );

    useEffect(() => {
      opacity.value = withSpring(autoplay ? 0 : 1, singleItemFadeSpeed);
    }, [autoplay, opacity]);

    return (
      <Path
        path="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z"
        color={color}
        opacity={opacity}
        matrix={matrix}
      />
    );
  }
);
