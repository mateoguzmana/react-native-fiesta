import { shuffleArray } from './array';

export function getEmojisToRender(
  emojis: string[],
  itemsToRender: number
): string[] {
  let emojiToPushIndex = 0;
  const newEmojis: string[] = [];

  const randomisedItems = shuffleArray(emojis);

  new Array(itemsToRender).fill(0).map((_, index) => {
    if (index >= randomisedItems.length) {
      emojiToPushIndex = 0;
    } else {
      emojiToPushIndex = index;
    }

    newEmojis.push(randomisedItems[emojiToPushIndex]);
  });

  return newEmojis;
}
