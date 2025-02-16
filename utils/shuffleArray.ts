// eslint-disable-next-line
export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Swap
  }
  return array;
};
