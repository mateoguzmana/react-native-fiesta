import React, { memo, useMemo } from 'react';
import { Group } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { fromRadians } from '../utils/fireworks';
import { FireworkParticle } from './FireworkParticle';

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
  /**
   * Performance gets affected with more than 180 particles
   * @default 50
   */
  numberOfParticles?: number;
}

export const Firework = memo(
  ({
    initialPosition,
    color = '#000',
    autoHide = true,
    particleRadius,
    fireworkRadius = 400,
    numberOfParticles = 50,
  }: FireworkProps) => {
    const cx = useMemo(() => initialPosition?.x ?? 0, [initialPosition?.x]);
    const cy = useMemo(() => initialPosition?.y ?? 0, [initialPosition?.y]);

    const particlesToDraw = useMemo(
      () => () => {
        const golden_ratio = (Math.sqrt(4) + 2) / 2 - 1;
        const golden_angle = golden_ratio * (2 * Math.PI);
        const circle_rad = fireworkRadius * 0.4 - 20; // defines the radious of the final circle

        const particlesToDrawArray = [];

        for (let i = 1; i <= numberOfParticles; ++i) {
          const dot_rad = (numberOfParticles / 10) * 0.001 * i;
          const ratio = i / numberOfParticles;
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
      [cx, cy, fireworkRadius, numberOfParticles]
    );

    const opacity = useSharedValue(0);

    useEffect(() => {
      opacity.value = withTiming(
        1,
        {
          duration: 2000,
        },
        () => {
          if (autoHide) {
            opacity.value = withTiming(0, {
              duration: 2000,
            });
          }
        }
      );
    }, [autoHide, opacity]);

    return (
      <Group origin={{ x: cx, y: cy }} opacity={opacity}>
        {particlesToDraw().map((c, i) => {
          return (
            <FireworkParticle
              key={i}
              x={c.initialPosX}
              y={c.initialPosY}
              finalPos={{ x: c.x, y: c.y }}
              r={c.r * 10 ?? particleRadius}
              color={color ?? c.color}
            />
          );
        })}
      </Group>
    );
  }
);
