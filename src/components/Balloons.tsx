import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Canvas,
  Group,
  runSpring,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';
import Balloon from './Balloon';
import { FiestaThemes } from '../constants/theming';
import { screenHeight, screenWidth } from '../constants/dimensions';
import { shuffleArray } from '../utils/array';

interface BalloonsProps {
  theme?: string[];
  autoplay?: boolean;
}

const xGap = 60;
const yPositions = [150, 0, 300, 100, 200, 0, 200, 100, 300, 0];
const possibleDepths = [0.9, 1];
const optimalNumberOfBalloons = Math.floor(screenWidth / xGap);
const ballonsToRenderArray = [...Array(optimalNumberOfBalloons)];

function Balloons({
  theme = FiestaThemes.default,
  autoplay = true,
}: BalloonsProps) {
  const randomisedColors = useMemo(() => shuffleArray(theme), [theme]);

  const yPosition = useValue(screenHeight + 100);

  const changeBalloonPosition = useCallback(
    () =>
      runSpring(yPosition, -screenHeight, {
        stiffness: 0.2,
      }),
    [yPosition]
  );

  const pushBalloons = useCallback(() => {
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
      },
    ],
    [yPosition]
  );

  useEffect(() => {
    autoplay && pushBalloons();
  }, [pushBalloons, autoplay]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {ballonsToRenderArray.map((_, index) => (
          <Balloon
            key={Math.random()}
            x={xGap * index}
            y={yPositions[index]}
            color={randomisedColors[index]}
            r={40}
            depth={
              possibleDepths[Math.floor(Math.random() * possibleDepths.length)]
            }
          />
        ))}
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default Balloons;
