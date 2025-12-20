class Cell {
  #ship;
  
  #isAttacked;

  constructor() {
    this.#isAttacked = false;
    this.#ship = null;
  }

  isAttacked() {
    return this.#isAttacked;
  }

  getAttacked() {
    if (this.#isAttacked) return;

    this.#isAttacked = true;
    this.#ship?.hit();
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
