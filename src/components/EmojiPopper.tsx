import { Canvas, Text, useFont } from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

interface EmojiPopperProps {
  emoji: string;
}

function EmojiPopper({ emoji }: EmojiPopperProps) {
  const font = useFont(require('../fonts/emojis.ttf'), 40);

  if (!font) return null;

  return (
    <Canvas style={styles.canvas}>
      <Text
        x={10}
        y={screenHeight - 300}
        text={emoji}
        font={font}
        color="white"
      />
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
