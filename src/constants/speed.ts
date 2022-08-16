const slowSpringSpeed = {
  stiffness: 0.2,
};

const normalSpringSpeed = {
  stiffness: 0.5,
};

const fastSpringSpeed = {
  stiffness: 0.7,
};

export const fiestaSpeedConfig = {
  slow: slowSpringSpeed,
  normal: normalSpringSpeed,
  fast: fastSpringSpeed,
};

export enum FiestaSpeed {
  Slow = 'slow',
  Normal = 'normal',
  Fast = 'fast',
}
