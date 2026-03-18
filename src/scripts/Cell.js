import CELL_STATE from './CELL_STATE';

class Cell {
  #ship;
  #isAttacked;
  #isBlocked;

  constructor() {
    this.#ship = null;
    this.#isAttacked = false;
    this.#isBlocked = false;
  }

  attack() {
    if (this.#isAttacked) return;

    this.#isAttacked = true;

    if (!this.#ship) {
      return;
    }

    this.#ship.hit();
  }

  block() {
    this.#isBlocked = true;
  }

  isAttacked() {
    return this.#isAttacked;
  }

  isOccupied() {
    return !!this.#ship || this.#isBlocked;
  }

  getState() {
    if (!this.#isAttacked) {
      return CELL_STATE.IDLE;
    }

    if (!this.#ship) {
      return CELL_STATE.MISSED;
    }

    if (this.#ship.isSunk()) {
      return CELL_STATE.SUNK;
    }

    return CELL_STATE.HIT;
  }

  getShip() {
    return this.#ship;
  }

  setShip(ship) {
    if (!this.isOccupied()) {
      this.#ship = ship;
    }
  }
}

export default Cell;
