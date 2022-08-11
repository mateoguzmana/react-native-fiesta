import React, { useCallback, useEffect } from 'react';
import {
  Canvas,
  Group,
  runSpring,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';
import Firework from './Firework';
import { palette } from '../constants/theming';
import { screenHeight } from '../constants/dimensions';

interface FireworksProps {
  theme?: string[];
  autoplay?: boolean;
}

const BOTTOM = -350;
const numberOfParticles = 18;
const particlesToRenderArray = [...Array(numberOfParticles)];

const INITIAL_POSITION = {
  x: 100,
  y: -500,
};

const radius = 100;
const particleRadiuses = [4];

let xValues: number[] = [];
let yValues: number[] = [];

const particlesColors = [palette.red, palette.blue, palette.golden];

for (var i = 0; i < numberOfParticles; i++) {
  xValues[i] =
    INITIAL_POSITION.x +
    radius * Math.cos((2 * Math.PI * i) / numberOfParticles);
  yValues[i] =
    INITIAL_POSITION.y +
    radius * Math.sin((2 * Math.PI * i) / numberOfParticles);
}

function Fireworks({ autoplay = true }: FireworksProps) {
  const xPosition = useValue(screenHeight - BOTTOM + 0);

  const changeBalloonPosition = useCallback(
    () =>
      runSpring(xPosition, -screenHeight, {
        stiffness: 0.2,
      }),
    [xPosition]
  );

  const pushBalloons = useCallback(() => {
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  const transform = useComputedValue(
    () => [
      {
        translateY: xPosition.current,
      },
    ],
    [xPosition]
  );

  useEffect(() => {
    // autoplay && pushBalloons();
  }, [pushBalloons, autoplay]);

  return (
    <Canvas style={styles.canvas}>
      <Group transform={transform}>
        {particlesToRenderArray.map((_, index) => (
          <Firework
            key={Math.random()}
            x={INITIAL_POSITION.x}
            y={INITIAL_POSITION.y}
            finalPos={{
              x: xValues[index] ?? 0,
              y: yValues[index] ?? 0,
            }}
            r={particleRadiuses[0] ?? 0}
            color={particlesColors[0] ?? '#000'}
          />
        ))}
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

export default Fireworks;
