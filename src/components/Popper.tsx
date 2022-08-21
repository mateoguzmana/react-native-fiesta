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
import { shuffleArray } from '../utils/array';
import { colorsFromTheme } from '../utils/colors';
import { FiestaThemes } from '../constants/theming';

interface RenderItemParams {
  x: number;
  y: number;
  colors: string[];
}

export interface PopperProps {
  spacing?: number;
  theme?: string[];
  renderItem: (
    renderItemParams: RenderItemParams,
    index: number
  ) => React.ReactElement;
}

function Popper({
  spacing = 30,
  theme = FiestaThemes.default,
  renderItem,
}: PopperProps) {
  const optimalNumberOfItems = Math.floor(screenWidth / spacing);
  const itemsToRenderArray = [...Array(optimalNumberOfItems)];
  const yPositions = shuffleArray(
    itemsToRenderArray.map((_, i) => i * spacing)
  );
  const containerYPosition = useValue(screenHeight);
  const colors = useMemo(
    () => colorsFromTheme(theme, optimalNumberOfItems),
    [theme, optimalNumberOfItems]
  );

  const changeItemPosition = useCallback(
    () =>
      runSpring(containerYPosition, -screenHeight, {
        stiffness: 0.5,
      }),
    [containerYPosition]
  );

  const transform = useComputedValue(
    () => [
      {
        translateY: containerYPosition.current,
      },
    ],
    [containerYPosition]
  );

  useEffect(() => {
    changeItemPosition();
  }, [changeItemPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {itemsToRenderArray.map((_, index) =>
          renderItem(
            { x: spacing * index, y: yPositions[index], colors },
            index
          )
        )}
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

export default memo(Popper);
