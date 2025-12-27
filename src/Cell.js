import CELL_STATUS from "./CELL_STATUS";

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

  getStatus() {
    if (!this.#isAttacked) return CELL_STATUS.IDLE;
    if (!this.#ship) return CELL_STATUS.MISSED;
    if (this.#ship.isSunk()) return CELL_STATUS.SUNK;
    return CELL_STATUS.HIT;
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
