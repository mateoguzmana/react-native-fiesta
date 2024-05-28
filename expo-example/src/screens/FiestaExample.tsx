import React from 'react';
import {
  Canvas,
  LinearGradient,
  Fill,
  // Use this function instead of interpolateColor from Reanimated
  interpolateColors,
  vec,
  Group,
} from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const startColors = [
  'rgba(34, 193, 195, 0.4)',
  'rgba(34,193,195,0.4)',
  'rgba(63,94,251,1)',
  'rgba(253,29,29,0.4)',
];
const endColors = [
  'rgba(0,212,255,0.4)',
  'rgba(253,187,45,0.4)',
  'rgba(252,70,107,1)',
  'rgba(252,176,69,0.4)',
];

export const FiestaExample = () => {
  const { width, height } = useWindowDimensions();
  const colorsIndex = useSharedValue(0);
  const opacity = useSharedValue(0);
  useEffect(() => {
    colorsIndex.value = withRepeat(
      withTiming(startColors.length - 1, {
        duration: 4000,
      }),
      -1,
      true
    );
    opacity.value = withTiming(1, {
      duration: 100,
    });
  }, [colorsIndex, opacity]);

  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], startColors),
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], endColors),
    ];
  });
  return (
    <Canvas style={{ flex: 1, backgroundColor: 'black' }}>
      <Group opacity={opacity}>
        <Fill>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={gradientColors}
          />
        </Fill>
      </Group>
    </Canvas>
  );
};
