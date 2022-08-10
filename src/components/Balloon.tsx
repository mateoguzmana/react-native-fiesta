import React, { memo, useMemo } from 'react';
import { Circle, Group, Path } from '@shopify/react-native-skia';
import { palette } from '../constants/theming';

interface BalloonProps {
  x: number;
  y?: number;
  color: string;
  r?: number;
}

const SKEW_X_VALUES = [0.1, 0, -0.1];
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

  const skewX =
    SKEW_X_VALUES[Math.floor(Math.random() * SKEW_X_VALUES.length)] ?? 0;

  return (
    <Group
      transform={[
        {
          translateY: y,
          skewX,
        },
      ]}
    >
      <Group transform={[{ translateX: xSpacing.string }]}>
        <Path
          path={`M 100 22 C 90 10, 110 80, 100 100 S 100 170, 100 150`}
          color={palette.golden}
          style="stroke"
          strokeJoin="round"
          strokeWidth={2}
        />
      </Group>

      <Circle cx={xSpacing.circle} cy={-10} r={r} color={color} />

      <Circle
        cx={xSpacing.reflection}
        cy={-30}
        r={r / 4}
        color={palette.gray}
      />
    </Group>
  );
}

export default memo(Balloon);
