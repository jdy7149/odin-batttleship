const shuffleArray = (arr) => {
  for (let i = this.arr.length - 1; i > 0; i--) {
    const randomidx = Math.floor(Math.random() * (i + 1));

    [this.arr[i], this.arr[randomidx]] = [this.arr[randomidx], this.arr[i]];
  }
};

const isValidCoordinate = (k) => k >= 0 && k < 10;

export { shuffleArray, isValidCoordinate };
