import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  ForwardedRef,
  useState,
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

export const Popper = memo(
  forwardRef<PopperHandler, PopperProps>(
    (
      {
        spacing = 30,
        theme = FiestaThemes.Default,
        renderItem,
        autoPlay = true,
      }: PopperProps,
      ref: PopperRef
    ) => {
      const [displayCanvas, setDisplayCanvas] = useState<boolean>(autoPlay);

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

      // Once the animation finishes, we proceed to hiding the canvas to avoid blocking the UI
      useEffect(() => {
        const unsubscribe = containerYPosition.addListener((value) => {
          if (value < -250 && displayCanvas) {
            setDisplayCanvas(false);
            containerYPosition.current = screenHeight;
          }
        });

        return () => {
          unsubscribe();
        };
      }, [containerYPosition, displayCanvas]);

      useImperativeHandle(ref, () => ({
        start() {
          setDisplayCanvas(true);
        },
      }));

      useEffect(() => {
        displayCanvas && changeItemPosition();
      }, [displayCanvas, changeItemPosition]);

      if (!displayCanvas) return null;

      return (
        // @ts-ignore
        <Canvas
          style={[
            styles.canvas,
            // If the autoPlay is false it means the component is controlled, hence we have to put the zIndex as 1
            // otherwise we won't be able to display the animation properly because of how the context provider is set
            autoPlay ? styles.canvasBehind : styles.canvasInFront,
          ]}
        >
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
  )
);

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  canvasBehind: {
    zIndex: -1,
  },
  canvasInFront: {
    zIndex: 1,
  },
});
