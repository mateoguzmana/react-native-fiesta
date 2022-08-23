export function getBalloonsYPositions(
  itemsToRender: number,
  possibleYPositions: number[]
) {
  const newPositions: number[] = [];
  let positionToPushIndex = 0;

  new Array(itemsToRender).fill(0).map(() => {
    if (positionToPushIndex === possibleYPositions.length - 1) {
      positionToPushIndex = 0;
    } else {
      positionToPushIndex++;
    }

    newPositions.push(possibleYPositions[positionToPushIndex] ?? 0);
  });

  return newPositions;
}
