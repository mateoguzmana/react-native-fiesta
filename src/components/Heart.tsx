import React, { memo, useCallback, useEffect } from 'react';
import { Group, Path, runSpring, useValue } from '@shopify/react-native-skia';
import { baseColors } from '../constants/theming';
import { singleItemFadeSpeed } from '../constants/speed';

export interface HeartProps {
  x: number;
  y: number;
  autoplay?: boolean;
  color?: string;
}

export const Heart = memo(
  ({ x, y, autoplay = true, color = baseColors.red }: HeartProps) => {
    const opacity = useValue(1);

    const changeOpacity = useCallback(
      () => runSpring(opacity, 0, singleItemFadeSpeed),
      [opacity]
    );

    useEffect(() => {
      autoplay && changeOpacity();
    }, [autoplay, changeOpacity]);

    return (
      // @TODO: this can be optimised by using a matrix instead of multiple transforms
      <Group transform={[{ translateY: y }]}>
        <Group transform={[{ translateX: x }]}>
          <Group transform={[{ scale: 0.05 }]}>
            <Path
              path="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z"
              color={color}
              opacity={opacity}
            />
          </Group>
        </Group>
      </Group>
    );
  }
);
