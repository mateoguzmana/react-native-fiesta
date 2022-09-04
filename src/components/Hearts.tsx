import React, { forwardRef, memo } from 'react';
import Heart from './Heart';
import Popper, { PopperHandler, PopperProps, PopperRef } from './Popper';

export interface HeartsProps extends Omit<PopperProps, 'renderItem'> {}

function Hearts(props: HeartsProps, ref?: PopperRef) {
  return (
    <Popper
      renderItem={({ x, y, colors }, index) => (
        <Heart key={index} x={x} y={y} color={colors[index]} />
      )}
      {...props}
      ref={ref}
    />
  );
}

export default memo(forwardRef<PopperHandler, HeartsProps>(Hearts));
