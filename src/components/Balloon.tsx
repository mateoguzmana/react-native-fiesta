import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Circle,
  Group,
  Rect,
  runSpring,
  useValue,
} from '@shopify/react-native-skia';
import {SpringConfig} from '@shopify/react-native-skia/lib/typescript/src/animation/spring/types';
import {screenHeight} from '../constants/dimensions';
import {palette} from '../constants/theming';

interface BalloonProps {
  x: number;
  y?: number;
  color: string;
  r?: number;
}

const BOTTOM = -350;
const SKEW_X_VALUES = [0.1, 0, -0.1];

const springOptions: SpringConfig = {
  stiffness: 0.2,
};

function Balloon({x, y = 0, color, r = 40}: BalloonProps) {
  const reflectPosition = useValue(screenHeight - 315 - BOTTOM + y);
  const mainBalloonPosition = useValue(screenHeight - 300 - BOTTOM + y);
  const stringPosition = useValue(screenHeight - 265 - BOTTOM + y);

  const changeReflectPosition = useCallback(
    () => runSpring(reflectPosition, -screenHeight, springOptions),
    [reflectPosition],
  );
  const changeMainBalloonPosition = useCallback(
    () => runSpring(mainBalloonPosition, -screenHeight, springOptions),
    [mainBalloonPosition],
  );
  const changeStringPosition = useCallback(
    () => runSpring(stringPosition, -screenHeight, springOptions),
    [stringPosition],
  );

  const pushBalloon = useCallback(() => {
    changeReflectPosition();
    changeMainBalloonPosition();
    changeStringPosition();
  }, [changeReflectPosition, changeMainBalloonPosition, changeStringPosition]);

  useEffect(() => {
    pushBalloon();
  }, [pushBalloon]);

  const skewX = useMemo(
    () => SKEW_X_VALUES[Math.floor(Math.random() * SKEW_X_VALUES.length)],
    [],
  );

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

      <Circle cx={65 + x} cy={reflectPosition} r={r / 4} color={palette.gray} />
    </Group>
  );
}

export default Balloon;
