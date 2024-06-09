import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  type ForwardedRef,
  useState,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Group } from '@shopify/react-native-skia';
import {
  cancelAnimation,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';
import { screenHeight } from '../constants/dimensions';
import { screenWidth } from '../constants/dimensions';
import { shuffleArray } from '../utils/array';
import { colorsFromTheme } from '../utils/colors';
import { FiestaThemes } from '../constants/theming';
import { FiestaSpeed, singleItemFadeSpeed } from '../constants/speed';

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
  /**
   * Controls the speed of the elements moving across the screen
   * @default FiestaSpeed.Normal
   */
  positionSpringConfig?: SpringConfig;
  /**
   * Controls the speed of the elements fading out
   * @default singleItemFadeSpeed – mass is set to screenHeight, which calculates the fade speed based on the screen height
   */
  fadeSpringConfig?: SpringConfig;
}

export type StartPopperParams = Pick<
  PopperProps,
  'theme' | 'direction' | 'positionSpringConfig' | 'fadeSpringConfig'
>;

export interface PopperHandler {
  start(params?: StartPopperParams): void;
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
        positionSpringConfig = FiestaSpeed.Normal,
        fadeSpringConfig = singleItemFadeSpeed,
      }: PopperProps,
      ref: PopperRef
    ) => {
      // properties that might be controlled are also defined as states and refs
      const [controlledTheme, setControlledTheme] = useState<string[]>(theme);
      const controlledDirection = useRef<PopperDirection>(direction);
      const controlledPositionSpringConfig =
        useRef<SpringConfig>(positionSpringConfig);
      const controlledFadeSpringConfig = useRef<SpringConfig>(fadeSpringConfig);

      const [displayCanvas, setDisplayCanvas] = useState<boolean>(autoPlay);

      const initialPosition =
        controlledDirection.current === PopperDirection.Ascending
          ? screenHeight
          : -screenHeight / 2;
      const finalPosition =
        controlledDirection.current === PopperDirection.Ascending
          ? -screenHeight
          : screenHeight;

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

      const containerYPosition = useSharedValue(0);
      const opacity = useSharedValue(1);

      const colors = useMemo(
        () => colorsFromTheme(controlledTheme, optimalNumberOfItems),
        [controlledTheme, optimalNumberOfItems]
      );

      const changeItemPosition = useCallback(() => {
        containerYPosition.value = withSpring(
          finalPosition,
          controlledPositionSpringConfig.current,
          (finished) => {
            if (finished) {
              containerYPosition.value = initialPosition;

              runOnJS(setDisplayCanvas)(false);
            }
          }
        );

        opacity.value = withSpring(0, controlledFadeSpringConfig.current);
      }, [
        containerYPosition,
        controlledFadeSpringConfig,
        controlledPositionSpringConfig,
        finalPosition,
        initialPosition,
        opacity,
      ]);

      const transform = useDerivedValue(() => [
        { translateY: containerYPosition.value },
      ]);

      useImperativeHandle(ref, () => ({
        start(params) {
          // cancel any ongoing animation
          cancelAnimation(containerYPosition);
          setDisplayCanvas(false);

          // reset the container position and opacity
          containerYPosition.value = initialPosition;
          opacity.value = 1;

          if (params?.theme) {
            setControlledTheme(params.theme);
          }
          if (params?.direction) {
            controlledDirection.current = params.direction;
          }
          if (params?.positionSpringConfig) {
            controlledPositionSpringConfig.current =
              params.positionSpringConfig;
          }
          if (params?.fadeSpringConfig) {
            controlledFadeSpringConfig.current = params.fadeSpringConfig;
          }

          // plays the animation again
          setDisplayCanvas(true);
          changeItemPosition();
        },
      }));

      // when the controlled direction changes, reset the container position
      useEffect(() => {
        containerYPosition.value = initialPosition;
      }, [containerYPosition, controlledDirection, initialPosition]);

      useEffect(() => {
        displayCanvas && changeItemPosition();
      }, [displayCanvas, changeItemPosition]);

      if (!displayCanvas) return null;

      return (
        <Canvas style={styles.canvas} pointerEvents="none">
          <Group transform={transform} opacity={opacity}>
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
