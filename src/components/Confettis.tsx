import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Group,
  processTransform2d,
  Rect,
  useComputedValue,
  useTiming,
  Easing,
  vec,
  Skia,
  Shader,
  Fill,
} from '@shopify/react-native-skia';
import { FiestaThemes } from '../constants/theming';
import { colorsFromTheme } from '../utils/colors';
import { generateRandomCoordinates } from '../utils/fireworks';
import { screenHeight } from '../constants/dimensions';

const optimalNumberOfConfettis = 20;

function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const source = Skia.RuntimeEffect.Make(`
uniform float  iTime;
vec3 iResolution = vec3(1.0, 1.0, 1.0);

vec4 main(vec2 FC) {
  vec4 o = vec4(0);
  vec2 p = vec2(0), c=p, u=FC.xy*2.-iResolution.xy;
  float a;
  for (float i=0; i<4e2; i++) {
    a = i/2e2-1.;
    p = cos(i*2.4+iTime+vec2(0,11))*sqrt(1.-a*a);
    c = u/iResolution.y+vec2(p.x,a)/(p.y+2.);
    o += (cos(i+vec4(0,2,4,0))+1.)/dot(c,c)*(1.-p.y)/3e4;
  }
  return o;
}
`)!;

export interface ConfettisProps extends Pick<ConfettiProps, 'size'> {
  autoHide?: boolean;
  theme?: string[];
  numberOfConfettis?: number;
}

export const Confettis = memo(
  ({
    theme = FiestaThemes.Default,
    numberOfConfettis = optimalNumberOfConfettis,
  }: ConfettisProps) => {
    const fireworksToRenderArray = useMemo(
      () => [...Array(numberOfConfettis)],
      [numberOfConfettis]
    );
    const colors = useMemo(
      () => colorsFromTheme(theme, numberOfConfettis),
      [numberOfConfettis, theme]
    );

    const positions = useMemo(
      () => generateRandomCoordinates(numberOfConfettis, screenHeight / 2),
      [numberOfConfettis]
    );

    const iTime = useTiming(
      {
        from: 0,
        to: 10,
      },
      {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }
    );

    const uniforms = useComputedValue(
      () => ({
        iTime: iTime.current,
        iResolution: vec(100, 100),
      }),
      [iTime]
    );

    return (
      <Canvas style={styles.canvas} pointerEvents="none">
        {fireworksToRenderArray.map((_, index) => (
          <Confetti
            key={index}
            position={positions[index] ?? { x: 0, y: 0 }}
            color={colors[index] ?? 'red'}
            index={index}
          />
        ))}

        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
      </Canvas>
    );
  }
);

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

interface ConfettiProps {
  position: { x: number; y: number };
  color: string;
  index: number;
  size?: number;
}

const ANIMATION_DURATION = 6000;

const Confetti = memo(
  ({ position, color, index, size = 30 }: ConfettiProps) => {
    const randomDuration = useMemo(
      () => randomIntFromInterval(ANIMATION_DURATION, ANIMATION_DURATION * 1.5),
      []
    );

    const yPosition = useTiming(
      {
        from: -screenHeight / 2 + position.y,
        to: screenHeight + (Math.random() * screenHeight) / 2,
      },
      {
        duration: randomDuration,
        easing: Easing.inOut(Easing.ease),
      }
    );

    const origin = useComputedValue(() => {
      return vec(position.x, yPosition.current);
    }, [yPosition]);

    const rotateValue = useTiming(
      {
        from: 0,
        to: degreesToRadians(Math.random() < 0.5 ? -360 : 360),
        loop: true,
      },
      {
        duration: randomDuration / 2,
      }
    );

    const scaleYValue = useTiming(
      {
        from: Math.random() < 0.5 ? -0.5 : 0.5,
        to: 0,
        loop: true,
        yoyo: true,
      },
      {
        duration: randomDuration / 2,
      }
    );

    const matrix = useComputedValue(
      () =>
        processTransform2d([
          { rotate: rotateValue.current },
          { scaleY: scaleYValue.current },
          { skewX: scaleYValue.current / 2 },
          { skewY: -scaleYValue.current / 2 },
        ]),
      [rotateValue, scaleYValue]
    );

    return (
      <Group origin={origin} matrix={matrix} key={index}>
        <Rect
          x={position.x}
          y={yPosition}
          width={size / 3}
          height={size}
          color={color}
        />
      </Group>
    );
  }
);

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
