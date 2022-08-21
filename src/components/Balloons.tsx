import React from 'react';
import Balloon from './Balloon';
import Popper, { PopperProps } from './Popper';

const possibleDepths = [0.9, 1];

export interface BalloonsProps extends Omit<PopperProps, 'renderItem'> {}

function Balloons({ spacing = 60, ...props }: BalloonsProps) {
  return (
    <Popper
      spacing={spacing}
      renderItem={({ x, y, colors }, index) => (
        <Balloon
          key={index}
          x={x}
          y={y}
          color={colors[index]}
          r={40}
          depth={
            possibleDepths[Math.floor(Math.random() * possibleDepths.length)]
          }
        />
      )}
      {...props}
    />
  );
}

export default Balloons;
