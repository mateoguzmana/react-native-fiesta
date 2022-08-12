import React, { memo } from 'react';
import { Group, Path } from '@shopify/react-native-skia';
import { palette } from '../constants/theming';

function Star() {
  return (
    <Group transform={[{ scale: 0.1 }]}>
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color={palette.yellow}
      />
    </Group>
  );
}

export default memo(Star);
