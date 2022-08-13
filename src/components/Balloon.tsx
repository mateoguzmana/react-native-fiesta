import React, { memo, useMemo } from 'react';
import { Circle, Group, Oval, Path, Shadow } from '@shopify/react-native-skia';
import { palette } from '../constants/theming';

interface BalloonProps {
  x: number;
  y?: number;
  color: string;
  r?: number;
}

const X_DIFF = 50;

function Balloon({ x, y = 0, color, r = 40 }: BalloonProps) {
  const xSpacing = useMemo(
    () => ({
      string: x - X_DIFF,
      circle: 95 - X_DIFF + x,
      reflection: 105 - X_DIFF + x,
    }),
    [x]
  );

  return (
    <Group transform={[{ translateX: xSpacing.string }]}>
      <Group
        transform={[
          {
            translateY: y,
          },
        ]}
      >
        <Group transform={[{ translateX: -55 }]}>
          <Path
            path={`M 100 22 C 90 10, 110 80, 100 100 S 100 170, 100 150`}
            color={palette.golden}
            style="stroke"
            strokeJoin="round"
            strokeWidth={5}
          />
        </Group>

        <Group transform={[{ translateY: -50 }]}>
          <Group>
            <Oval height={r * 2.3} width={r * 2} color={color} />
            <Shadow dx={-12} dy={-12} blur={40} color="#fff" inner />
          </Group>
        </Group>

        <Circle
          cx={r / 0.8}
          cy={-25}
          r={r / 4}
          color={palette.gray}
          opacity={0.3}
        />
      </Group>
    </Group>
  );
}

export default memo(Balloon);
