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

function FireworkParticle({
  x,
  y = 0,
  finalPos,
  r = 8,
  color,
  autoHide = true,
}: FireworkParticleProps) {
  const cx = useTiming(
    { to: finalPos.x, from: x },
    { duration: 1200, easing: Easing.linear }
  );

  const cy = useTiming(
    { to: finalPos.y, from: y },
    { duration: 1200, easing: Easing.linear }
  );

  const opacityValue = useTiming(
    { to: 0, from: 1 },
    { duration: 2000, easing: Easing.linear }
  );

  const transformCircle = useComputedValue(
    () => vec(cx.current, cy.current),
    [cx, cy]
  );

  const opacity = useComputedValue(
    () => (autoHide ? opacityValue.current : 1),
    [opacityValue]
  );

  return <Circle c={transformCircle} r={r} color={color} opacity={opacity} />;
}

export default memo(FireworkParticle);
