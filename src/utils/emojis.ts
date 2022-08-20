import { shuffleArray } from './array';

export function getEmojisToRender(
  emojis: string[],
  itemsToRender: number
): string[] {
  let emojiToPushIndex = 0;
  const newEmojis: string[] = [];

  const randomisedItems = shuffleArray(emojis);

  new Array(itemsToRender).fill(0).map(() => {
    if (emojiToPushIndex === randomisedItems.length - 1) {
      emojiToPushIndex = 0;
    } else {
      emojiToPushIndex++;
    }

    newEmojis.push(randomisedItems[emojiToPushIndex]);
  });

  return newEmojis;
}
