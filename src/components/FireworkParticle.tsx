import React, { memo } from 'react';
import {
  vec,
  Circle,
  useComputedValue,
  useTiming,
  Easing,
} from '@shopify/react-native-skia';

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
    const cx = useTiming(
      { to: finalPos.x, from: x },
      { duration: 1200, easing: Easing.linear }
    );

    const cy = useTiming(
      { to: finalPos.y, from: y },
      { duration: 1200, easing: Easing.linear }
    );

    const transformCircle = useComputedValue(
      () => vec(cx.current, cy.current),
      [cx, cy]
    );

    return <Circle c={transformCircle} r={r} color={color} />;
  }
);
