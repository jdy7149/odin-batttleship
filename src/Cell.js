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
    if (this.#isAttacked) return;

    this.#isAttacked = true;
    this.ship?.hit();
  }
}

export default Cell;
