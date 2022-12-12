import { screenWidth, screenHeight } from '../constants/dimensions';

export function fromRadians(angle: number) {
  return angle * (180.0 / Math.PI);
}

export function generateRandomCoordinates(
  numElements: number
): Array<{ x: number; y: number }> {
  // Create an array to store the generated coordinates
  const coordinates: Array<{ x: number; y: number }> = [];

  // Generate random x,y coordinates until we have the desired number of elements
  while (coordinates.length < numElements) {
    // Generate a random x,y coordinate
    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;

    // Check if the coordinate is unique
    let unique = true;
    for (const { x: prevX, y: prevY } of coordinates) {
      if (prevX === x && prevY === y) {
        unique = false;
        break;
      }
    }

    // If the coordinate is unique, add it to the array of coordinates
    if (unique) {
      coordinates.push({ x, y });
    }
  }

  return coordinates;
}
