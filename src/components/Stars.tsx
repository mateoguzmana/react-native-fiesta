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
import Star from './Star';

const optimalNumberOfStars = Math.floor(screenWidth / 60);
const starsToRenderArray = [...Array(optimalNumberOfStars)];

function Stars() {
  const yPosition = useValue(screenHeight - 350);

  const changeBalloonPosition = useCallback(
    () =>
      runSpring(yPosition, -screenHeight, {
        stiffness: 0.2,
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
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {starsToRenderArray.map((_, index) => (
          <Star key={index} />
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

export default memo(Stars);
