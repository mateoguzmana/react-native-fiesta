import React, { memo } from 'react';
import { type SkFont, Text } from '@shopify/react-native-skia';
import { singleItemFadeSpeed } from '../constants/speed';
import { withSpring } from 'react-native-reanimated';

export interface EmojiProps {
  x?: number;
  y?: number;
  autoHide?: boolean;
  emoji?: string;
  font: SkFont;
}

export const Emoji = memo(
  ({ x = 0, y = 0, autoHide = true, emoji = '🎉', font }: EmojiProps) => {
    const opacity = withSpring(
      { to: autoHide ? 0 : 1, from: 1 },
      singleItemFadeSpeed
    );

    if (!font) return null;

    return <Text x={x} y={y} text={emoji} opacity={opacity.to} font={font} />;
  }
);
