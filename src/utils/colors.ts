import { shuffleArray } from './array';

export function colorsFromTheme(theme: string[], itemsToRender: number) {
  const newColors: string[] = [];
  let colorToPushIndex = 0;

  const randomisedColors = shuffleArray(theme);

  new Array(itemsToRender).fill(0).map(() => {
    if (colorToPushIndex === randomisedColors.length - 1) {
      colorToPushIndex = 0;
    } else {
      colorToPushIndex++;
    }

    newColors.push(randomisedColors[colorToPushIndex]);
  });

  return newColors;
}
