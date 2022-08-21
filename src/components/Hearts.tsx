import React, { memo } from 'react';
import Heart from './Heart';
import Popper, { PopperProps } from './Popper';

export interface HeartsProps extends Omit<PopperProps, 'renderItem'> {}

function Hearts(props: HeartsProps) {
  return (
    <Popper
      renderItem={({ x, y, colors }, index) => (
        <Heart key={index} x={x} y={y} color={colors[index]} />
      )}
      {...props}
    />
  );
}

export default memo(Hearts);
