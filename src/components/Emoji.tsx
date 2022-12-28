import React, { memo } from 'react';
import { SkFont, Text, useSpring } from '@shopify/react-native-skia';
import { singleItemFadeSpeed } from '../constants/speed';

export interface EmojiProps {
  x?: number;
  y?: number;
  autoHide?: boolean;
  emoji?: string;
  font: SkFont;
}

export const Emoji = memo(
  ({ x = 0, y = 0, autoHide = true, emoji = '🎉', font }: EmojiProps) => {
    const opacity = useSpring(
      { to: autoHide ? 0 : 1, from: 1 },
      singleItemFadeSpeed
    );

    if (!font) return null;

    return <Text x={x} y={y} text={emoji} opacity={opacity} font={font} />;
  }
);
