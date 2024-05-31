import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  type ForwardedRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import { shuffleArray } from '../utils/array';
import { colorsFromTheme } from '../utils/colors';
import { FiestaThemes } from '../constants/theming';
import { FiestaSpeed } from '../constants/speed';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface RenderItemParams {
  x: number;
  y: number;
  colors: string[];
}

export enum PopperDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export interface PopperProps {
  spacing?: number;
  theme?: string[];
  renderItem: (
    renderItemParams: RenderItemParams,
    index: number
  ) => React.ReactElement;
  autoPlay?: boolean;
  /**
   * Direction in which the elements will be popped
   */
  direction?: PopperDirection;
}

export interface PopperHandler {
  start(params?: Pick<PopperProps, 'theme' | 'direction'>): void;
}

export type PopperRef = ForwardedRef<PopperHandler>;

export const Popper = memo(
  forwardRef<PopperHandler, PopperProps>(
    (
      {
        spacing = 30,
        theme = FiestaThemes.Default,
        renderItem,
        autoPlay = true,
        direction = PopperDirection.Descending,
      }: PopperProps,
      ref: PopperRef
    ) => {
      // properties that might be controlled are also defined in the state
      const [controlledTheme, setControlledTheme] = useState<string[]>(theme);
      const [controlledDirection, setControlledDirection] =
        useState<PopperDirection>(direction);

      const [displayCanvas, setDisplayCanvas] = useState<boolean>(autoPlay);
      const initialPosition = useMemo(
        () =>
          controlledDirection === PopperDirection.Ascending
            ? screenHeight
            : -screenHeight / 2,
        [controlledDirection]
      );
      const finalPosition = useMemo(
        () =>
          controlledDirection === PopperDirection.Ascending
            ? -screenHeight
            : screenHeight,
        [controlledDirection]
      );

      const optimalNumberOfItems = useMemo(
        () => Math.floor(screenWidth / spacing),
        [spacing]
      );
      const itemsToRenderArray = useMemo(
        () => [...Array(optimalNumberOfItems)],
        [optimalNumberOfItems]
      );

      const yPositions = useMemo(
        () => shuffleArray(itemsToRenderArray.map((_, i) => i * spacing)),
        [itemsToRenderArray, spacing]
      );

      const containerYPosition = useSharedValue(initialPosition);

      const colors = useMemo(
        () => colorsFromTheme(controlledTheme, optimalNumberOfItems),
        [controlledTheme, optimalNumberOfItems]
      );

      const changeItemPosition = useCallback(() => {
        containerYPosition.value = withSpring(
          finalPosition,
          FiestaSpeed.Normal
        );
      }, [containerYPosition, finalPosition]);

      const transform = useDerivedValue(
        () => [
          {
            translateY: containerYPosition.value,
          },
        ],
        [containerYPosition]
      );

      // // Once the animation finishes, we hide the canvas to avoid blocking the UI
      // useEffect(() => {
      //   const unsubscribe = containerYPosition.addListener((value) => {
      //     const offset = 250;
      //     const shouldHide =
      //       controlledDirection === PopperDirection.Ascending
      //         ? value < -offset
      //         : value >= screenHeight - offset;

      //     if (shouldHide && displayCanvas) {
      //       setDisplayCanvas(false);
      //       containerYPosition.current = initialPosition;
      //     }
      //   });

      //   return () => {
      //     unsubscribe();
      //   };
      // }, [
      //   containerYPosition,
      //   controlledDirection,
      //   displayCanvas,
      //   initialPosition,
      // ]);

      useImperativeHandle(ref, () => ({
        start(params) {
          setDisplayCanvas(true);

          if (params?.theme) {
            setControlledTheme(params.theme);
          }

          if (params?.direction) {
            setControlledDirection(params.direction);
          }
        },
      }));

      useEffect(() => {
        displayCanvas && changeItemPosition();
      }, [displayCanvas, changeItemPosition]);

      if (!displayCanvas) return null;

      return (
        <Canvas style={styles.canvas} pointerEvents="none">
          <Group transform={transform}>
            <>
              {itemsToRenderArray.map((_, index) =>
                renderItem(
                  { x: spacing * index, y: yPositions[index], colors },
                  index
                )
              )}
            </>
          </Group>
        </Canvas>
      );
    }
  )
);

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
