class Cell {
  #isAttacked;

  constructor() {
    this.#isAttacked = false;
    this.ship = null;
  }

  isAttacked() {
    return this.#isAttacked;
  }

  getAttacked() {
    this.#isAttacked = true;
  }
}

export default Cell;
