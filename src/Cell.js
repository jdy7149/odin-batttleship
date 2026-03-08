import CELL_STATE from './CELL_STATE';

class Cell {
  #ship;
  #state;
  #isBlocked;

  constructor() {
    this.#ship = null;
    this.#state = CELL_STATE.IDLE;
    this.#isBlocked = false;
  }

  attack() {
    if (this.#state !== CELL_STATE.IDLE) return;

    if (!this.#ship) {
      this.#state = CELL_STATE.MISSED;
      return;
    }

    this.#ship.hit();

    if (!this.#ship.isSunk()) {
      this.#state = CELL_STATE.HIT;
    } else {
      this.#state = CELL_STATE.SUNK;
    }
  }

  block() {
    this.#isBlocked = true;
  }

  isAttacked() {
    return this.#state !== CELL_STATE.IDLE;
  }

  isOccupied() {
    return !!this.#ship || this.#isBlocked;
  }

  getState() {
    return this.#state;
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
