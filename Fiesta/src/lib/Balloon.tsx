import React, {useEffect} from 'react';
import {
  Circle,
  Group,
  Rect,
  runSpring,
  useValue,
} from '@shopify/react-native-skia';
import {SpringConfig} from '@shopify/react-native-skia/lib/typescript/src/animation/spring/types';
import {screenHeight} from './constants/dimensions';
import {palette} from './constants/theming';

interface BalloonProps {
  x: number;
  y?: number;
  color: string;
  r?: number;
}

const BOTTOM = -350;
const SKEW_X_VALUES = [0.1, 0, -0.1];

function Balloon({x, y = 0, color, r = 40}: BalloonProps) {
  const shadowPosition = useValue(screenHeight - 315 - BOTTOM + y);
  const mainBalloonPosition = useValue(screenHeight - 300 - BOTTOM + y);
  const stringPosition = useValue(screenHeight - 265 - BOTTOM + y);

  const springOptions: SpringConfig = {
    stiffness: 0.2,
  };

  const changeShadowPosition = () =>
    runSpring(shadowPosition, -screenHeight, springOptions);
  const changeMainBalloonPosition = () =>
    runSpring(mainBalloonPosition, -screenHeight, springOptions);
  const changeStringPosition = () =>
    runSpring(stringPosition, -screenHeight, springOptions);

  const pushBalloon = () => {
    changeShadowPosition();
    changeMainBalloonPosition();
    changeStringPosition();
  };

  useEffect(() => {
    pushBalloon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skewX = SKEW_X_VALUES[Math.floor(Math.random() * SKEW_X_VALUES.length)];

  return (
    <Group transform={[{skewX}]}>
      <Rect
        x={48 + x}
        y={stringPosition}
        width={3}
        height={100}
        color={palette.golden}
      />

      <Circle cx={50 + x} cy={mainBalloonPosition} r={r} color={color} />

      <Circle cx={65 + x} cy={shadowPosition} r={r / 4} color={palette.gray} />
    </Group>
  );
}

export default Balloon;
