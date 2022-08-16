import React, { memo } from 'react';
import {
  Circle,
  Group,
  Oval,
  Path,
  Shadow,
  useComputedValue,
  useTiming,
} from '@shopify/react-native-skia';
import { palette } from '../constants/theming';

interface BalloonProps {
  x?: number;
  y?: number;
  color?: string;
  r?: number;
  depth?: number;
}

function Balloon({
  x = 0,
  y = 0,
  color = 'blue',
  r = 40,
  depth = 1,
}: BalloonProps) {
  const stringSkewX = useTiming({
    to: 0.05,
    from: -0.05,
    yoyo: true,
    loop: true,
  });

  const stringRotationTransform = useComputedValue(
    () => [
      {
        skewX: stringSkewX.current,
      },
    ],
    [stringSkewX]
  );

  return (
    <Group transform={[{ scale: depth }]}>
      <Group transform={[{ translateX: x }]}>
        <Group
          transform={[
            {
              translateY: y,
            },
          ]}
        >
          <Group transform={stringRotationTransform}>
            <Group transform={[{ translateX: -55 }]}>
              <Path
                path={`M 100 22 C 90 10, 110 80, 100 100 S 100 170, 100 150`}
                color={palette.golden}
                style="stroke"
                strokeJoin="round"
                strokeWidth={5}
              />
            </Group>
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
    </Group>
  );
}

export default memo(Balloon);
