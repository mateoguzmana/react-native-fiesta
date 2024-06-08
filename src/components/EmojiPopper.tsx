import React, { forwardRef } from 'react';
import type { SkFont } from '@shopify/react-native-skia';
import { screenWidth } from '../constants/dimensions';
import { Emoji } from './Emoji';
import { getEmojisToRender } from '../utils/emojis';
import { Popper, type PopperHandler, type PopperProps } from './Popper';

export interface EmojiPopperProps extends Omit<PopperProps, 'renderItem'> {
  emojis?: string[];
  font: SkFont;
}

export const EmojiPopper = forwardRef<PopperHandler, EmojiPopperProps>(
  (
    { emojis = ['🎉'], font, spacing = 30, ...props }: EmojiPopperProps,
    ref
  ) => {
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
            autoHide={false}
          />
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
