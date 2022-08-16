const slowSpringSpeed = {
  mass: 1,
  stiffness: 0.2,
  damping: 19,
};

const normalSpringSpeed = {
  mass: 1,
  stiffness: 0.35,
  damping: 19,
};

const fastSpringSpeed = {
  mass: 1,
  stiffness: 0.5,
  damping: 19,
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
