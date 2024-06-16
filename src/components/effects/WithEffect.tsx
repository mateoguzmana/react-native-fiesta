import { Canvas, RoundedRect, Shader, Skia } from '@shopify/react-native-skia';
import React, { forwardRef, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform float width;
uniform float height;

vec4 main(vec2 pos) {
  // normalized x,y values go from 0 to 1, the canvas is {width}x{height}
  vec2 normalized = pos/vec2(width, height);
  return vec4(normalized.x, normalized.y, 0.5, 1);
}`)!;

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
});

interface WithEffectProps extends TouchableOpacityProps {}

function _WithEffect(
  props: WithEffectProps,
  _ref: React.Ref<TouchableOpacity>
) {
  const effectCX = useSharedValue(0);
  const effectCY = useSharedValue(0);
  const effectWidth = useSharedValue(0);
  const effectHeight = useSharedValue(0);
  const effectOpacity = useSharedValue(0);
  const effectRadius = useSharedValue(10);

  const uniforms = useDerivedValue(() => {
    return {
      width: effectWidth.value,
      height: effectHeight.value,
    };
  }, [effectWidth, effectHeight]);

  const effectRef = useRef<TouchableOpacity>(null);

  const onPress = (event: GestureResponderEvent) => {
    props.onPress?.(event);

    effectRef.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log({ x, y, width, height, pageX, pageY });

      effectCX.value = x;
      effectCY.value = y;
      effectWidth.value = width;
      effectHeight.value = height;
      effectOpacity.value = withTiming(1, { duration: 500 }, () => {
        effectOpacity.value = withTiming(0, { duration: 500 });
      });

      // @ts-expect-error - borderRadius is not in the types
      const hasBorderRadius = props.style?.borderRadius;

      if (typeof hasBorderRadius === 'number') {
        effectRadius.value = hasBorderRadius;
      }
    });
  };

  return (
    <>
      <Canvas style={styles.canvas} pointerEvents="none">
        <RoundedRect
          x={effectCX}
          y={effectCY}
          width={effectWidth}
          height={effectHeight}
          r={effectRadius}
          opacity={effectOpacity}
        >
          <Shader source={source} uniforms={uniforms} />
        </RoundedRect>
      </Canvas>

      <TouchableOpacity {...props} onPress={onPress} ref={effectRef} />
    </>
  );
}

/**
 * IMPORTANT: This component is experimental.
 * A `TouchableOpacity` with built-in effects.
 */
export const WithEffect = forwardRef(_WithEffect);
