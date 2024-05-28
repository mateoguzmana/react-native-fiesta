import React, { forwardRef } from 'react';
import { Star } from './Star';
import { Popper, type PopperHandler, type PopperProps } from './Popper';

export interface StarsProps extends Omit<PopperProps, 'renderItem'> {}

export const Stars = forwardRef<PopperHandler, StarsProps>(
  (props: StarsProps, ref) => {
    return (
      <Popper
        renderItem={({ x, y, colors }, index) => (
          <Star key={index} x={x} y={y} color={colors[index]} />
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
