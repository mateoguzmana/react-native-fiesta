import { shuffleArray } from './array';

export function colorsFromTheme(theme: string[], itemsToRender: number) {
  const newColors: string[] = [];
  let colorToPushIndex = 0;

  const randomisedColors = shuffleArray(theme);

  new Array(itemsToRender).fill(0).map((_, index) => {
    if (index >= randomisedColors.length) {
      colorToPushIndex = 0;
    } else {
      colorToPushIndex = index;
    }

    newColors.push(randomisedColors[colorToPushIndex]);
  });

  return newColors;
}
