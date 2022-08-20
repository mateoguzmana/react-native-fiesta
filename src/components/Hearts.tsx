import React, { memo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  runSpring,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import Heart from './Heart';
import { shuffleArray } from '../utils/array';

const xGap = 40;
const optimalNumberOfStars = Math.floor(screenWidth / xGap);
const starsToRenderArray = [...Array(optimalNumberOfStars)];
const yPositions = shuffleArray(starsToRenderArray.map((_, i) => i * xGap));

function Hearts() {
  const yPosition = useValue(screenHeight);

  const changeItemPosition = useCallback(
    () =>
      runSpring(yPosition, -screenHeight, {
        stiffness: 0.5,
      }),
    [yPosition]
  );

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
      },
    ],
    [yPosition]
  );

  useEffect(() => {
    changeItemPosition();
  }, [changeItemPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {starsToRenderArray.map((_, index) => (
          <Heart key={index} x={xGap * index} y={yPositions[index]} />
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

export default memo(Hearts);
