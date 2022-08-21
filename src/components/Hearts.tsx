import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  runSpring,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import Heart from './Heart';
import { shuffleArray } from '../utils/array';
import { colorsFromTheme } from '../utils/colors';
import { FiestaThemes } from '../constants/theming';

const xGap = 40;
const optimalNumberOfHearts = Math.floor(screenWidth / xGap);
const heartsToRenderArray = [...Array(optimalNumberOfHearts)];
const yPositions = shuffleArray(heartsToRenderArray.map((_, i) => i * xGap));

interface HeartsProps {
  theme?: string[];
}

function Hearts({ theme = FiestaThemes.default }: HeartsProps) {
  const colors = useMemo(
    () => colorsFromTheme(theme, optimalNumberOfHearts),
    [theme]
  );
  const yPosition = useValue(screenHeight);

  const changeItemPosition = useCallback(
    () =>
      runSpring(yPosition, -screenHeight, {
        stiffness: 0.5,
      }),
    [yPosition]
  );

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
      },
    ],
    [yPosition]
  );

  useEffect(() => {
    changeItemPosition();
  }, [changeItemPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {heartsToRenderArray.map((_, index) => (
          <Heart
            key={index}
            x={xGap * index}
            y={yPositions[index]}
            color={colors[index]}
          />
        ))}
      </Group>
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

export default memo(Hearts);
