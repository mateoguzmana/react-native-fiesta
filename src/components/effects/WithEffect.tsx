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
uniform float time;

float f(vec3 p) {
    p.z -= time * 10.;
    float a = p.z * .1;
    p.xy *= mat2(cos(a), sin(a), -sin(a), cos(a));
    return .1 - length(cos(p.xy) + sin(p.yz));
}

half4 main(vec2 fragcoord) { 
    vec3 d = .5 - vec3(fragcoord / vec2(width, height), 0);
    vec3 p = vec3(0);
    for (int i = 0; i < 32; i++) {
      p += f(p) * d;
    }
    return ((sin(p) + vec3(2, 5, 12)) / length(p)).xyz1;
}

`)!;

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
  const effectTime = useSharedValue(0);

  const uniforms = useDerivedValue(() => {
    return {
      width: effectWidth.value,
      height: effectHeight.value,
      time: effectTime.value,
    };
  });

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

      effectTime.value = withTiming(100, { duration: 500 }, () => {
        effectTime.value = withTiming(0, { duration: 500 });
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
