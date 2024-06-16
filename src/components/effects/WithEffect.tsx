import { Canvas, RoundedRect, Shader, Skia } from '@shopify/react-native-skia';
import React, { forwardRef, useRef, useEffect } from 'react';
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
uniform vec2 mouse;

const mat3 p = mat3(13.323122,23.5112,21.71123,21.1212,28.7312,11.9312,21.8112,14.7212,61.3934);

vec4 main(vec2 fragCoord) {
    vec2 uv = mouse + vec2(1., height / width) * fragCoord / vec2(width, height);
    vec3 acc = vec3(0.0);
    float dof = 5.0 * sin(time * 0.1);
    for (int i = 0; i < 200; i++) {
        float fi = float(i);
        vec2 q = uv * (1.0 + fi * .1);
        q += vec2(q.y * (.8 * mod(fi * 7.238917, 1.0) - .8 * 0.5), 1.5 * time / (1.0 + fi * .1 * 0.03));
        vec3 n = vec3(floor(q), 31.189 + fi);
        vec3 m = floor(n) * 0.00001 + fract(n);
        vec3 mp = (31415.9 + m) / fract(p * m);
        vec3 r = fract(mp);
        vec2 s = abs(mod(q, 1.0) - 0.5 + 0.9 * r.xy - 0.45);
        s += 0.01 * abs(2.0 * fract(10.0 * q.yx) - 1.0); 
        float d = 0.6 * max(s.x - s.y, s.x + s.y) + max(s.x, s.y) - 0.01;
        float edge = 0.005 + 0.05 * min(0.5 * abs(fi - 5.0 - dof), 1.0);
        acc += vec3(smoothstep(edge, -edge, d) * (r.x / (1.0 + 0.02 * fi * .1)));
    }
    return vec4(vec3(acc), 1.0);
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
  const time = useSharedValue(0);
  const mouseX = useSharedValue(0);
  const mouseY = useSharedValue(0);

  const uniforms = useDerivedValue(() => {
    return {
      width: effectWidth.value,
      height: effectHeight.value,
      time: time.value,
      mouse: [mouseX.value, mouseY.value],
    };
  }, [effectWidth, effectHeight, time, mouseX, mouseY]);

  const effectRef = useRef<TouchableOpacity>(null);

  const onPress = (event: GestureResponderEvent) => {
    props.onPress?.(event);

    effectRef.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log({ x, y, width, height, pageX, pageY });

      effectCX.value = x;
      effectCY.value = y;
      effectWidth.value = width;
      effectHeight.value = height;
      mouseX.value = pageX;
      mouseY.value = pageY;
      effectOpacity.value = withTiming(1, { duration: 500 }, () => {
        effectOpacity.value = withTiming(0, { duration: 500 });
      });

      // @ts-expect-error - borderRadius is not in the types
      const hasBorderRadius = props.style?.borderRadius;

      if (typeof hasBorderRadius === 'number') {
        effectRadius.value = hasBorderRadius;
      }
    });

    const interval = setInterval(() => {
      time.value += 0.1;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      time.value = 0;
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      time.value += 0.1;
    }, 100);
    return () => clearInterval(interval);
  }, [time]);

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

export const WithEffect = forwardRef(_WithEffect);
