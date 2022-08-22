import { screenHeight } from './dimensions';

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

export const FiestaSpeed = {
  Slow: slowSpringSpeed,
  Normal: normalSpringSpeed,
  Fast: fastSpringSpeed,
};

export const singleItemFadeSpeed = {
  mass: (screenHeight / Math.random()) * 0.2,
};
