import React, { forwardRef } from 'react';
import { Heart } from './Heart';
import {
  Popper,
  type PopperHandler,
  type PopperProps,
  type PopperRef,
} from './Popper';

export interface HeartsProps extends Omit<PopperProps, 'renderItem'> {}

export const Hearts = forwardRef<PopperHandler, HeartsProps>(
  (props: HeartsProps, ref?: PopperRef) => (
    <Popper
      renderItem={({ x, y, colors }, index) => (
        <Heart key={index} x={x} y={y} color={colors[index]} />
      )}
      {...props}
      ref={ref}
    />
  )
);
