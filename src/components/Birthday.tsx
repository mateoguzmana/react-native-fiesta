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

interface BirthdayProps {
  theme?: string[];
  autoplay?: boolean;
}

const xGap = 60;
const yPositions = [150, 0, 300, 100, 200, 0, 200, 100, 300, 0];
const possibleRadiuses = [30, 35, 40, 45];
const BOTTOM = -350;
const optimalNumberOfBalloons = Math.floor(screenWidth / xGap);
const ballonsToRenderArray = [...Array(optimalNumberOfBalloons)];

function Birthday({
  theme = FiestaThemes.default,
  autoplay = true,
}: BirthdayProps) {
  const randomisedColors = useMemo(() => shuffleArray(theme), [theme]);

  const xPosition = useValue(screenHeight - BOTTOM + 0);

  const changeBalloonPosition = useCallback(
    () =>
      runSpring(xPosition, -screenHeight, {
        stiffness: 0.2,
      }),
    [xPosition]
  );

  const pushBalloons = useCallback(() => {
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  const transform = useComputedValue(
    () => [
      {
        translateY: xPosition.current,
      },
    ],
    [xPosition]
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
            r={
              possibleRadiuses[
                Math.floor(Math.random() * possibleRadiuses.length)
              ]
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

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default Birthday;
