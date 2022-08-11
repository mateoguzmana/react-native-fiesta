import React, { memo } from 'react';
import FireworkParticle from './FireworkParticle';
import { screenHeight, screenWidth } from '../constants/dimensions';

const numberOfParticles = 18;
const particlesToRenderArray = [...Array(numberOfParticles)];

const initialPosition = {
  x: screenWidth / 2,
  y: -screenHeight / 2,
};

interface FireworkProps {
  position: {
    xValues: number[];
    yValues: number[];
  };
  color: string;
}

function Firework({ position, color }: FireworkProps) {
  return (
    <>
      {particlesToRenderArray.map((_, index) => (
        <FireworkParticle
          key={Math.random()}
          x={initialPosition.x}
          y={initialPosition.y}
          finalPos={{
            x: position?.xValues[index] ?? 0,
            y: position?.yValues[index] ?? 0,
          }}
          r={8}
          color={color ?? '#000'}
        />
      ))}
    </>
  );
}

export default memo(Firework);
