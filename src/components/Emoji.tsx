import React, { memo, useEffect } from 'react';
import { type SkFont, Text } from '@shopify/react-native-skia';
import { useSharedValue, withSpring } from 'react-native-reanimated';
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
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withSpring(autoHide ? 0 : 1, singleItemFadeSpeed);
    }, [autoHide, opacity]);

    if (!font) return null;

    return <Text x={x} y={y} text={emoji} opacity={opacity} font={font} />;
  }
);
