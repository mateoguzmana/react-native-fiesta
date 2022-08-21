import React, { memo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  runSpring,
  SkFont,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import { shuffleArray } from '../utils/array';
import Emoji from './Emoji';
import { getEmojisToRender } from '../utils/emojis';

const xGap = 40;
const optimalNumberOfItems = Math.floor(screenWidth / xGap);
const itemsToRenderArray = [...Array(optimalNumberOfItems)];
const yPositions = shuffleArray(itemsToRenderArray.map((_, i) => i * xGap));

export interface EmojiPopperProps {
  emojis?: string[];
  font: SkFont;
}

function EmojiPopper({ emojis = ['🎉'], font }: EmojiPopperProps) {
  const yPosition = useValue(screenHeight);

  const emojisToRender = getEmojisToRender(emojis, optimalNumberOfItems);

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
        {itemsToRenderArray.map((_, index) => (
          <Emoji
            key={index}
            x={xGap * index}
            y={yPositions[index]}
            emoji={emojisToRender[index] ?? '❓'}
            font={font}
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
