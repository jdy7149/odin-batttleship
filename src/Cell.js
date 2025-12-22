class Cell {
  #ship;

  #isAttacked;

  #isOccupied;

  constructor() {
    this.#ship = null;
    this.#isAttacked = false;
    this.#isOccupied = false;
  }

  isAttacked() {
    return this.#isAttacked;
  }

  attack() {
    if (this.#isAttacked) return;

    this.#isAttacked = true;
    this.#ship?.hit();
  }

  isOccupied() {
    return this.#isOccupied;
  }

  occupy() {
    this.#isOccupied = true;
  }

  getShip() {
    return this.#ship;
  }

  setShip(ship) {
    if (!this.#ship) {
      this.#ship = ship;
    }
  }
}

export default Cell;
