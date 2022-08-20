import { Canvas, Text, useFont } from '@shopify/react-native-skia';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

interface EmojiPopperProps {
  emoji: string;
}

function EmojiPopper({ emoji }: EmojiPopperProps) {
  const font = useFont(require('../fonts/emojis2.ttf'));

  if (!font) return null;

  return (
    <Canvas style={styles.canvas}>
      <Text x={0} y={0} text={emoji} font={font} size={100} color="white" />
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
