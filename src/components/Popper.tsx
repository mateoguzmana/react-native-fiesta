import React, { memo, useCallback, useEffect } from 'react';
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

interface RenderItemParams {
  x: number;
  y: number;
}

export interface PopperProps {
  xGap?: number;
  renderItem: (
    renderItemParams: RenderItemParams,
    index: number
  ) => React.ReactElement;
}

function Popper({ xGap = 40, renderItem }: PopperProps) {
  const optimalNumberOfItems = Math.floor(screenWidth / xGap);
  const itemsToRenderArray = [...Array(optimalNumberOfItems)];
  const yPositions = shuffleArray(itemsToRenderArray.map((_, i) => i * xGap));
  const containerYPosition = useValue(screenHeight);

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

  if (!renderItem) return null;

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {itemsToRenderArray.map((_, index) =>
          renderItem({ x: xGap * index, y: yPositions[index] }, index)
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
