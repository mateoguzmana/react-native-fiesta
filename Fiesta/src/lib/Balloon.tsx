import React, {useEffect} from 'react';
import {
  Circle,
  Group,
  Rect,
  runSpring,
  useValue,
} from '@shopify/react-native-skia';
import {Dimensions} from 'react-native';
import {SpringConfig} from '@shopify/react-native-skia/lib/typescript/src/animation/spring/types';

const screenHeight: number = Dimensions.get('screen').height;

interface BalloonProps {
  x: number;
  y?: number;
  color: BalloonColors;
  r?: number;
}

function Balloon({x, y = 0, color, r = 40}: BalloonProps) {
  const bottomPos = -350;
  const shadowPosition = useValue(screenHeight - 315 - bottomPos + y);
  const mainBalloonPosition = useValue(screenHeight - 300 - bottomPos + y);
  const stringPosition = useValue(screenHeight - 265 - bottomPos + y);

  const springOptions: SpringConfig = {
    stiffness: 0.2,
    mass: 1,
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

  const skewXValues = [0.1, 0, -0.1];
  const skewX = skewXValues[Math.floor(Math.random() * skewXValues.length)];

  return (
    <Group transform={[{skewX}]}>
      <Rect
        x={48 + x}
        y={stringPosition}
        width={3}
        height={100}
        color={stringColor}
      />

      <Circle cx={50 + x} cy={mainBalloonPosition} r={r} color={color} />

      <Circle
        cx={65 + x}
        cy={shadowPosition}
        r={r / 4}
        color="rgba(246, 243, 245, 0.5)"
      />
    </Group>
  );
}

export default Balloon;

enum BalloonColors {
  red = 'rgba(238, 17, 131, 1)',
  blue = 'rgba(0, 0, 255, 1)',
  green = 'rgba(0, 255, 0, 1)',
  yellow = 'rgba(255, 255, 0, 1)',
  purple = 'rgba(255, 0, 255, 1)',
  orange = 'rgba(255, 165, 0, 1)',
  pink = 'rgba(255, 192, 203, 1)',
}

const stringColor = 'rgba(245, 229, 27, 0.5)';
