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

interface BalloonProps {
  x: number;
  y?: number;
  finalPos: {
    x: number;
    y: number;
  };
  r: number;
  color: string;
}

function Firework({ x, y = 0, finalPos, r, color }: BalloonProps) {
  const xPosition = useValue(x);
  const yPosition = useValue(y);
  const changeYPosition = useCallback(
    () =>
      runSpring(yPosition, finalPos.y, {
        stiffness: 0.2,
      }),
    [yPosition, finalPos.y]
  );

  const changeXPosition = useCallback(
    () =>
      runSpring(xPosition, finalPos.x, {
        stiffness: 0.2,
      }),
    [xPosition, finalPos.x]
  );

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
      },
    ],
    [xPosition]
  );

  const transform2 = useComputedValue(
    () => vec(xPosition.current, 0),
    [xPosition]
  );

  const pushBalloons = useCallback(() => {
    changeXPosition();
    changeYPosition();
  }, [changeXPosition, changeYPosition]);

  useEffect(() => {
    pushBalloons();
  }, [pushBalloons]);

  return (
    <Group transform={transform}>
      <Circle c={transform2} r={r} color={color}>
        <BlurMask blur={r / 2} style="normal" />
      </Circle>
    </Group>
  );
}

export default memo(Firework);
