import React, { memo, useCallback, useEffect } from 'react';
import { runSpring, SkFont, Text, useValue } from '@shopify/react-native-skia';
import { singleItemFadeSpeed } from '../constants/speed';

export interface EmojiProps {
  x?: number;
  y?: number;
  autoHide?: boolean;
  emoji?: string;
  font: SkFont;
}

function Emoji({
  x = 0,
  y = 0,
  autoHide = true,
  emoji = '🎉',
  font,
}: EmojiProps) {
  const opacity = useValue(1);

  const changeOpacity = useCallback(
    () => runSpring(opacity, 0, singleItemFadeSpeed),
    [opacity]
  );

  useEffect(() => {
    autoHide && changeOpacity();
  }, [autoHide, changeOpacity]);

  if (!font) return null;

  return <Text x={x} y={y} text={emoji} opacity={opacity} font={font} />;
}

export default memo(Emoji);
