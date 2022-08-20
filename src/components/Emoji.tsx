import React, { memo, useCallback, useEffect } from 'react';
import { runSpring, Text, useFont, useValue } from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { palette } from '../constants/theming';

export interface EmojiProps {
  x: number;
  y: number;
  autoplay?: boolean;
  emoji: string;
  size?: number;
}

function Emoji({ x, y, autoplay = true, emoji, size = 30 }: EmojiProps) {
  const opacity = useValue(1);
  const font = useFont(require('../fonts/emojis.ttf'), size);

  const changeOpacity = useCallback(
    () =>
      runSpring(opacity, 0, {
        mass: screenHeight / 3,
      }),
    [opacity]
  );

  useEffect(() => {
    autoplay && changeOpacity();
  }, [autoplay, changeOpacity]);

  if (!font) return null;

  return (
    <Text
      x={x}
      y={y}
      text={emoji}
      opacity={opacity}
      font={font}
      color={palette.yellow}
    />
  );
}

export default memo(Emoji);