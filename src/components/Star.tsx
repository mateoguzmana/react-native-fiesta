import React, { memo, useCallback, useEffect } from 'react';
import { Group, Path, runSpring, useValue } from '@shopify/react-native-skia';
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
          <Group transform={[{ scale: 0.1 }]}>
            <Path
              path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
              color={color}
              opacity={opacity}
            />
          </Group>
        </Group>
      </Group>
    );
  }
);
