import React, { memo, useCallback, useEffect } from 'react';
import { runSpring, Text, useFont, useValue } from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { palette } from '../constants/theming';

interface EmojiProps {
  x: number;
  y: number;
  autoplay?: boolean;
  emoji: string;
}

function Emoji({ x, y, autoplay = true, emoji }: EmojiProps) {
  const opacity = useValue(1);
  const font = useFont(require('../fonts/emojis.ttf'), 40);

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
