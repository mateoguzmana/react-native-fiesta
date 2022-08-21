import React, { memo } from 'react';
import type { SkFont } from '@shopify/react-native-skia';
import { screenWidth } from '../constants/dimensions';
import Emoji from './Emoji';
import { getEmojisToRender } from '../utils/emojis';
import Popper from './Popper';

const xGap = 40;
const optimalNumberOfItems = Math.floor(screenWidth / xGap);

export interface EmojiPopperProps {
  emojis?: string[];
  font: SkFont;
}

function EmojiPopper({ emojis = ['🎉'], font }: EmojiPopperProps) {
  const emojisToRender = getEmojisToRender(emojis, optimalNumberOfItems);

  return (
    <Popper
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
