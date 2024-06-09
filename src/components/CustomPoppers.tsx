import React, { forwardRef } from 'react';
import { CustomPopper } from './CustomPopper';
import {
  Popper,
  type PopperHandler,
  type PopperProps,
  type PopperRef,
} from './Popper';

export interface CustomPoppersProps extends Omit<PopperProps, 'renderItem'> {
  children: React.ReactNode;
}

export const CustomPoppers = forwardRef<PopperHandler, CustomPoppersProps>(
  (props: CustomPoppersProps, ref?: PopperRef) => (
    <Popper
      renderItem={({ x, y, colors }, index) => (
        <CustomPopper
          key={index}
          x={x}
          y={y}
          color={colors[index]}
          autoPlay={false}
        >
          {props.children}
        </CustomPopper>
      )}
      {...props}
      ref={ref}
    />
  )
);
