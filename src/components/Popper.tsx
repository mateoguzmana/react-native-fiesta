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

const xGap = 40;
const optimalNumberOfItems = Math.floor(screenWidth / xGap);
const itemsToRenderArray = [...Array(optimalNumberOfItems)];
const yPositions = shuffleArray(itemsToRenderArray.map((_, i) => i * xGap));

interface RenderItemParams {
  x: number;
  y: number;
}

export interface PopperProps {
  renderItem: (
    renderItemParams: RenderItemParams,
    index: number
  ) => React.ReactElement;
}

function Popper({ renderItem }: PopperProps) {
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
