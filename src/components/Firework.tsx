import React, { memo, useMemo } from 'react';
import { Group } from '@shopify/react-native-skia';
import { FireworkParticle } from './FireworkParticle';
import { fromRadians } from '../utils/fireworks';
interface FireworkPosition {
  x: number;
  y: number;
}

export interface FireworkProps {
  initialPosition?: FireworkPosition;
  color?: string;
  autoHide?: boolean;
  particleRadius?: number;
  fireworkRadius?: number;
}

export const Firework = memo(
  ({
    initialPosition,
    color = '#000',
    autoHide,
    particleRadius,
    fireworkRadius = 400,
  }: FireworkProps) => {
    const cx = initialPosition?.x ?? 0;
    const cy = initialPosition?.y ?? 0;

    const particlesToDraw = useMemo(
      () => () => {
        const particles = 50; // performance gets affected with more than 180 particles
        const golden_ratio = (Math.sqrt(4) + 2) / 2 - 1;
        const golden_angle = golden_ratio * (2 * Math.PI);
        const circle_rad = fireworkRadius * 0.4 - 20; // defines the radious of the final circle

        const particlesToDrawArray = [];

        for (let i = 1; i <= particles; ++i) {
          const dot_rad = 0.006 * i;
          const ratio = i / particles;
          const angle = i * golden_angle;
          const spiral_rad = ratio * circle_rad;

          const x = cx + Math.cos(fromRadians(angle)) * spiral_rad;
          const y = cy + Math.sin(fromRadians(angle)) * spiral_rad;

          const initialPosX = cx;
          const initialPosY = cy;

          const particleColor = `rgba(${(i % 1000) + 200}, ${(i % 900) + 20}, ${
            (i % 256) + 20
          }, 1)`;

          particlesToDrawArray.push({
            x,
            y,
            color: particleColor,
            r: dot_rad,
            initialPosX,
            initialPosY,
          });
        }

        return particlesToDrawArray;
      },
      [cx, cy, fireworkRadius]
    );

    return (
      <Group origin={{ x: cx, y: cy }}>
        {particlesToDraw().map((c, i) => {
          return (
            <FireworkParticle
              key={i}
              x={c.initialPosX}
              y={c.initialPosY}
              finalPos={{ x: c.x, y: c.y }}
              r={c.r * 10 ?? particleRadius}
              color={color ?? c.color}
              autoHide={autoHide}
            />
          );
        })}
      </Group>
    );
  }
);
