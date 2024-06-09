import React, { memo, useEffect, useMemo } from 'react';
import { Group, processTransform2d } from '@shopify/react-native-skia';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { singleItemFadeSpeed } from '../constants/speed';

// @TODO: this props seem to be the same for all components
// maybe when this replaces the custom poppers, we can move this to a shared file
export interface CustomPopperProps {
  x?: number;
  y?: number;
  autoPlay?: boolean;
  color?: string;
  children: React.ReactNode;
}

export const CustomPopper = memo(
  ({ x = 0, y = 0, autoPlay = true, color, children }: CustomPopperProps) => {
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
      opacity.value = withSpring(autoPlay ? 0 : 1, singleItemFadeSpeed);
    }, [autoPlay, opacity]);

    return (
      <Group matrix={matrix} opacity={opacity} color={color}>
        {children}
      </Group>
    );
  }
);
