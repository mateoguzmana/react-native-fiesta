import React from 'react';
import { Balloon } from './Balloon';
import { Popper, PopperProps } from './Popper';
import { screenWidth } from '../constants/dimensions';
import { getBalloonsYPositions } from '../utils/balloons';

const SPACING = 45;
const possibleDepths = [0.9, 1];
const possibleYPositions = [150, 0, 300, 100, 250, 0, 150, 100, 300, 0];
const optimalNumberOfItems = Math.floor(screenWidth / SPACING);
const balloonsYPositions = getBalloonsYPositions(
  optimalNumberOfItems,
  possibleYPositions
);

export interface BalloonsProps extends Omit<PopperProps, 'renderItem'> {}

export function Balloons({ spacing = SPACING, ...props }: BalloonsProps) {
  return (
    <Popper
      spacing={spacing}
      renderItem={({ x, colors }, index) => (
        <Balloon
          key={index}
          x={x}
          y={balloonsYPositions[index]}
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
