import React, { memo, useCallback, useEffect } from 'react';
import {
  vec,
  Group,
  runSpring,
  useValue,
  Circle,
  BlurMask,
  useComputedValue,
} from '@shopify/react-native-skia';

interface FireworkParticleProps {
  x: number;
  y?: number;
  finalPos: {
    x: number;
    y: number;
  };
  r: number;
  color: string;
}

function FireworkParticle({
  x,
  y = 0,
  finalPos,
  r,
  color,
}: FireworkParticleProps) {
  const xPosition = useValue(x);
  const yPosition = useValue(y);
  const opacity = useValue(1);

  const changeYPosition = useCallback(
    () => runSpring(yPosition, finalPos.y),
    [yPosition, finalPos.y]
  );

  const changeXPosition = useCallback(
    () => runSpring(xPosition, finalPos.x),
    [xPosition, finalPos.x]
  );

  const changeOpacity = useCallback(
    () =>
      runSpring(opacity, 0, {
        mass: 0.1,
        damping: 0.2,
        stiffness: 0.5,
      }),
    [opacity]
  );

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
      },
    ],
    [xPosition]
  );

  const transformCircle = useComputedValue(
    () => vec(xPosition.current, 0),
    [xPosition]
  );

  const pushBalloons = useCallback(() => {
    changeXPosition();
    changeYPosition();
    changeOpacity();
  }, [changeOpacity, changeXPosition, changeYPosition]);

  useEffect(() => {
    pushBalloons();
  }, [pushBalloons]);

  return (
    <Group transform={transform}>
      <Circle c={transformCircle} r={r} color={color} opacity={opacity}>
        <BlurMask blur={r / 3} style="normal" />
      </Circle>
    </Group>
  );
}

export default memo(FireworkParticle);
