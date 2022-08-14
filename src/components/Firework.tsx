import React, { memo } from 'react';
import FireworkParticle from './FireworkParticle';
import { screenHeight, screenWidth } from '../constants/dimensions';

const numberOfParticles = 18;
const particlesToRenderArray = [...Array(numberOfParticles)];

const defaultparticlesInitialPosition = {
  x: screenWidth / 2,
  y: -screenHeight / 2,
};

interface FireworkPosition {
  x: number;
  y: number;
}

interface FireworkParticlePositions {
  xValues: number[];
  yValues: number[];
}

interface FireworkProps {
  particlesFinalposition?: FireworkParticlePositions;
  particlesInitialPosition?: FireworkPosition;
  color: string;
}

function Firework({
  particlesFinalposition,
  color,
  particlesInitialPosition,
}: FireworkProps) {
  return (
    <>
      {particlesToRenderArray.map((_, index) => (
        <FireworkParticle
          key={Math.random()}
          x={particlesInitialPosition?.x ?? defaultparticlesInitialPosition.x}
          y={particlesInitialPosition?.y ?? defaultparticlesInitialPosition.y}
          finalPos={{
            x: particlesFinalposition?.xValues[index] ?? 0,
            y: particlesFinalposition?.yValues[index] ?? 0,
          }}
          r={8}
          color={color ?? '#000'}
        />
      ))}
    </>
  );
}

export default memo(Firework);
