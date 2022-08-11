interface Coordinate {
  x: number;
  y: number;
}

export function getParticlesPositions(
  numberOfParticles: number,
  initialPosition: Coordinate,
  radius: number
): {
  xValues: number[];
  yValues: number[];
} {
  let xValues: number[] = [];
  let yValues: number[] = [];

  for (var i = 0; i < numberOfParticles; i++) {
    xValues[i] =
      initialPosition.x +
      radius * Math.cos((2 * Math.PI * i) / numberOfParticles);
    yValues[i] =
      initialPosition.y +
      radius * Math.sin((2 * Math.PI * i) / numberOfParticles);
  }

  return { xValues, yValues };
}

const initialPositions = [
  {
    x: 100,
    y: -500,
  },
  {
    x: 200,
    y: -700,
  },
  {
    x: 300,
    y: -800,
  },
];

export function getParticlesPositionsSet(
  numberOfParticles: number,
  radius: number
) {
  return initialPositions.map((initialPosition) => {
    return getParticlesPositions(numberOfParticles, initialPosition, radius);
  });
}
