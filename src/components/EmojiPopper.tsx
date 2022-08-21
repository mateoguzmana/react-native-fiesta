import React, { memo } from 'react';
import type { SkFont } from '@shopify/react-native-skia';
import { screenWidth } from '../constants/dimensions';
import Emoji from './Emoji';
import { getEmojisToRender } from '../utils/emojis';
import Popper, { PopperProps } from './Popper';

export interface EmojiPopperProps extends Omit<PopperProps, 'renderItem'> {
  emojis?: string[];
  font: SkFont;
}

function EmojiPopper({
  emojis = ['🎉'],
  font,
  spacing = 40,
}: EmojiPopperProps) {
  const optimalNumberOfItems = Math.floor(screenWidth / spacing);
  const emojisToRender = getEmojisToRender(emojis, optimalNumberOfItems);

  return (
    <Popper
      spacing={spacing}
      renderItem={({ x, y }, index) => (
        <Emoji
          key={index}
          x={x}
          y={y}
          emoji={emojisToRender[index] ?? '❓'}
          font={font}
        />
      )}
    />
  );
}

export default memo(EmojiPopper);
