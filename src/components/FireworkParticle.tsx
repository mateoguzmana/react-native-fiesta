import React, { memo } from 'react';
import {
  vec,
  Circle,
  useComputedValue,
  useTiming,
  Easing,
  Path,
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

    return (
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color={generateRandomHexColor()}
        origin={transformCircle}
        transform={[{ scale: 0.05 }]}
      />
    );
  }
);

function generateRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
