import React, { memo } from 'react';
import Heart from './Heart';
import { FiestaThemes } from '../constants/theming';
import Popper from './Popper';

export interface HeartsProps {
  theme?: string[];
}

function Hearts({ theme = FiestaThemes.default }: HeartsProps) {
  return (
    <Popper
      theme={theme}
      renderItem={({ x, y, colors }, index) => (
        <Heart key={index} x={x} y={y} color={colors[index]} />
      )}
    />
  );
}

export default memo(Hearts);
