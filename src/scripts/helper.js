const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomidx = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[randomidx]] = [arr[randomidx], arr[i]];
  }
};

const isValidCoordinate = (k) => k >= 0 && k < 10;

export { shuffleArray, isValidCoordinate };
