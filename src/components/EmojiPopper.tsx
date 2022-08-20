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
import { shuffleArray } from '../utils/array';
import Emoji from './Emoji';

const xGap = 40;
const optimalNumberOfItems = Math.floor(screenWidth / xGap);
const itemsToRenderArray = [...Array(optimalNumberOfItems)];
const yPositions = shuffleArray(itemsToRenderArray.map((_, i) => i * xGap));

interface EmojiPopperProps {
  emoji: string;
}

function EmojiPopper({ emoji }: EmojiPopperProps) {
  const yPosition = useValue(screenHeight);

  const changeBalloonPosition = useCallback(
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
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {itemsToRenderArray.map((_, index) => (
          <Emoji
            key={index}
            x={xGap * index}
            y={yPositions[index]}
            emoji={emoji}
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

export default memo(EmojiPopper);
