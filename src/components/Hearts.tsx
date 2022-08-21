import React, { memo, useMemo } from 'react';
import { screenWidth } from '../constants/dimensions';
import Heart from './Heart';
import { colorsFromTheme } from '../utils/colors';
import { FiestaThemes } from '../constants/theming';
import Popper from './Popper';

const xGap = 40;
const optimalNumberOfHearts = Math.floor(screenWidth / xGap);

export interface HeartsProps {
  theme?: string[];
}

function Hearts({ theme = FiestaThemes.default }: HeartsProps) {
  const colors = useMemo(
    () => colorsFromTheme(theme, optimalNumberOfHearts),
    [theme]
  );

  return (
    <Popper
      renderItem={({ x, y }, index) => (
        <Heart key={index} x={x} y={y} color={colors[index]} />
      )}
    />
  );
}

export default memo(Hearts);
