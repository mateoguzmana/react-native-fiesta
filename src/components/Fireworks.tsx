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
import { getParticlesPositionsSet } from '../utils/fireworks';
import { screenWidth } from '../constants/dimensions';

interface FireworksProps {
  theme?: string[];
  autoplay?: boolean;
}

const numberOfParticles = 18;
const particlesToRenderArray = [...Array(numberOfParticles)];

const initialPosition = {
  x: 100,
  y: -500,
};

const radius = 80;
const particleRadiuses = [8];

const particlesColors = [palette.red, palette.blue, palette.golden];

const fireworksPositions = getParticlesPositionsSet(numberOfParticles, radius);

function Fireworks({ autoplay = true }: FireworksProps) {
  const yPosition = useValue(screenHeight * 1.2);

  const changeBalloonPosition = useCallback(
    () =>
      runSpring(yPosition, -screenHeight, {
        stiffness: 0.2,
      }),
    [yPosition]
  );

  const pushBalloons = useCallback(() => {
    changeBalloonPosition();
  }, [changeBalloonPosition]);

  const transform = useComputedValue(
    () => [
      {
        translateY: yPosition.current,
        translateX: screenWidth / 2,
      },
    ],
    [yPosition]
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
            x={initialPosition.x}
            y={initialPosition.y}
            finalPos={{
              x: fireworksPositions?.[0]?.xValues[index] ?? 0,
              y: fireworksPositions?.[0]?.yValues[index] ?? 0,
            }}
            r={particleRadiuses[0] ?? 0}
            color={particlesColors[0] ?? '#000'}
          />
        ))}
        {particlesToRenderArray.map((_, index) => (
          <Firework
            key={Math.random()}
            x={initialPosition.x}
            y={initialPosition.y}
            finalPos={{
              x: fireworksPositions?.[1]?.xValues[index] ?? 0,
              y: fireworksPositions?.[1]?.yValues[index] ?? 0,
            }}
            r={particleRadiuses[0] ?? 0}
            color={particlesColors[1] ?? '#000'}
          />
        ))}
        {particlesToRenderArray.map((_, index) => (
          <Firework
            key={Math.random()}
            x={initialPosition.x}
            y={initialPosition.y}
            finalPos={{
              x: fireworksPositions?.[2]?.xValues[index] ?? 0,
              y: fireworksPositions?.[2]?.yValues[index] ?? 0,
            }}
            r={particleRadiuses[0] ?? 0}
            color={particlesColors[2] ?? '#000'}
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
