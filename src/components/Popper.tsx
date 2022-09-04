import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  ForwardedRef,
} from 'react';
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
import { FiestaSpeed } from '../constants/speed';

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
  autoPlay?: boolean;
}

export interface PopperHandler {
  start(): void;
}

export type PopperRef = ForwardedRef<PopperHandler>;

const Popper = (
  {
    spacing = 30,
    theme = FiestaThemes.Default,
    renderItem,
    autoPlay = true,
  }: PopperProps,
  ref: PopperRef
) => {
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
    () => runSpring(containerYPosition, -screenHeight, FiestaSpeed.Normal),
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

  useImperativeHandle(ref, () => ({
    start() {
      changeItemPosition();
    },
  }));

  useEffect(() => {
    autoPlay && changeItemPosition();
  }, [changeItemPosition, autoPlay]);

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
};

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

export default memo(forwardRef<PopperHandler, PopperProps>(Popper));
