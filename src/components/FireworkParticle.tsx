import React, { memo, useEffect } from 'react';
import { vec, Circle } from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface FireworkParticleProps {
  x: number;
  y?: number;
  finalPos: {
    x: number;
    y: number;
  };
  r?: number;
  color: string;
  autoHide?: boolean;
}

export const FireworkParticle = memo(
  ({ x, y = 0, finalPos, r = 8, color }: FireworkParticleProps) => {
    const cx = useSharedValue(x);
    const cy = useSharedValue(y);

    useEffect(() => {
      cx.value = withTiming(finalPos.x, {
        duration: 1200,
        easing: Easing.linear,
      });
      cy.value = withTiming(finalPos.y, {
        duration: 1200,
        easing: Easing.linear,
      });
    }, [cx, cy, finalPos.x, finalPos.y]);

    const transformCircle = useDerivedValue(() => vec(cx.value, cy.value));

    return <Circle c={transformCircle} r={r} color={color} />;
  }
);
