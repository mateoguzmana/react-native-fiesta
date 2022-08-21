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

const xGap = 40; // ideally the gap can be also set from an external component
const optimalNumberOfItems = Math.floor(screenWidth / xGap); // this one should remain the same as it is defined by the xGap
const itemsToRenderArray = [...Array(optimalNumberOfItems)]; // remains the sane
const yPositions = shuffleArray(itemsToRenderArray.map((_, i) => i * xGap)); // this one can also be very generic

interface RenderItemParams {
  x: number;
  y: number;
}

export interface PopperProps {
  renderItem: (renderItemParams: RenderItemParams) => React.ReactElement;
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
          renderItem({ x: xGap * index, y: yPositions[index] })
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
