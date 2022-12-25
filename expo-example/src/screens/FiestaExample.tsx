import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  Canvas,
  Circle,
  Easing,
  Fill,
  RuntimeShader,
  Shader,
  Skia,
  useComputedValue,
  useTiming,
} from '@shopify/react-native-skia';

const source = Skia.RuntimeEffect.Make(`
uniform float  iTime;
vec3 iResolution = vec3(512, 512, 1.0);
vec3 iMouse = vec3(512, 512, 1.0);

// Plasma Waves  
// Created by scarletshark in 2017-09-15
// https://www.shadertoy.com/view/ltXczj

const float overallSpeed = 0.2;
const float gridSmoothWidth = 0.015;
const float axisWidth = 0.05;
const float majorLineWidth = 0.025;
const float minorLineWidth = 0.0125;
const float majorLineFrequency = 5.0;
const float minorLineFrequency = 1.0;
const vec4 gridColor = vec4(0.5);
const float scale = 5.0;
const vec4 lineColor = vec4(0.25, 0.5, 1.0, 1.0);
const float minLineWidth = 0.02;
const float maxLineWidth = 0.5;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;
const int linesPerGroup = 16;

const vec4 bgColors0 = vec4(lineColor * 0.5);
const vec4 bgColors1 = lineColor - vec4(0.2, 0.2, 0.7, 1);


float drawSmoothLine(float pos, float halfWidth, float t) { 
  return smoothstep(halfWidth, 0.0, abs(pos - (t)));
}

float drawCrispLine(float pos, float halfWidth, float t) {
  return smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)));
}

float drawPeriodicLine(float freq, float width, float t) {
  return drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0));
}

float drawGridLines(float axis)   
{
    return   drawCrispLine(0.0, axisWidth, axis)
           + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
           + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
}

float drawGrid(vec2 space)
{
    return min(1., drawGridLines(space.x)
                  +drawGridLines(space.y));
}

// probably can optimize w/ noise, but currently using fourier transform
float random(float t)
{
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;   
}

float getPlasmaY(float x, float horizontalFade, float offset)   
{
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
}

vec4 main( in vec2 fragCoord )
{
    vec4 fragColor;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;
    
    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    // fun with nonlinear transformations! (wind / turbulence)
    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;
    
    vec4 lines = vec4(0);
    
    for(int l = 0; l < linesPerGroup; l++)
    {
        float normalizedLineIndex = float(l) / float(linesPerGroup);
        float offsetTime = iTime * offsetSpeed;
        float offsetPosition = float(l) + space.x * offsetFrequency;
        float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
        float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
        float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
        float linePosition = getPlasmaY(space.x, horizontalFade, offset);
        float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);
        
        float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
  			float circle = smoothstep(0.01 + gridSmoothWidth, 0.01, length(space - (circlePosition)))  * 4.0;
        
        line = line + circle;
        lines += line * lineColor * rand;
    }
    
    fragColor = vec4(0);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    // debug grid:
    //fragColor = mix(fragColor, gridColor, drawGrid(space));
    fragColor += lines;
    return fragColor;
}
`)!;

export function FiestaExample() {
  const iTime = useTiming(
    {
      from: 0,
      to: 1000,
    },
    {
      duration: 3000000,
      easing: Easing.linear,
    }
  );

  const uniforms = useComputedValue(
    () => ({
      iTime: iTime.current,
      // iTime: 10,
    }),
    [iTime]
  );

  return (
    <>
      <Canvas style={styles.canvas}>
        <Fill opacity={0.5}>
          <Shader source={source} uniforms={uniforms} />

          <RuntimeShader source={source} uniforms={uniforms} />
          <Circle cx={200} cy={200} r={200} color="lightblue" />
        </Fill>
      </Canvas>

      <TouchableOpacity
        style={{ backgroundColor: 'white', position: 'absolute', top: 300 }}
      >
        <Text>Press me</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    height: 200,
    // ...StyleSheet.absoluteFillObject,
  },
});
