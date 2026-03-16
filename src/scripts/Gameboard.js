import AXIS from './AXIS';
import Cell from './Cell';
import Ship from './Ship';

import { isValidCoordinate } from './helper';

class Gameboard {
  #board;
  #ships;

  constructor() {
    this.#board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => new Cell()),
    );
    this.#ships = [];
  }

  placeShip(x, y, axis, length) {
    if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
      throw Error('Invalid coordinate. It should be between 0 and 9');
    }

    if (!Object.values(AXIS).includes(axis)) {
      throw Error(
        'Wrong direction. Direction should be horizontal or vertical.',
      );
    }

    if (length < 1 || length > 4) {
      throw Error('Length of ship should be between 1 and 4.');
    }

    const ship = new Ship(length);

    const dx = axis === AXIS.HORIZONTAL ? 1 : 0;
    const dy = axis === AXIS.VERTICAL ? 1 : 0;

    // Gather coordinates where ship will be placed
    const placedCoords = [];

    for (let i = 0; i < length; i++) {
      const cell = this.#board[x + dy * i][y + dx * i];

      if (cell.isOccupied()) throw Error('Cells are already occupied.');

      placedCoords.push([x + dy * i, y + dx * i]);
    }

    // Place ship
    placedCoords.forEach(([a, b]) => this.#board[a][b].setShip(ship));

    // Gather coordinates which will be blocked
    const blockedCoords = [];

    for (let i = x - 1; i <= x + dy * (length - 1) + 1; i++) {
      for (let j = y - 1; j <= y + dx * (length - 1) + 1; j++) {
        const isPlacedRow = i >= x && i <= x + dy * (length - 1);
        const isPlacedCol = j >= y && j <= y + dx * (length - 1);

        if (
          !isValidCoordinate(i) ||
          !isValidCoordinate(j) ||
          (isPlacedRow && isPlacedCol)
        )
          continue;

        blockedCoords.push([i, j]);
      }
    }

    // Block cells
    blockedCoords.forEach(([a, b]) => this.#board[a][b].block());

    this.#ships.push(ship);
  }

  receiveAttack(x, y) {
    if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
      throw Error('Invalid coordinate.');
    }

    const cell = this.#board[x][y];

    if (cell.isAttacked())
      throw Error('Could not attack already attacked cell.');

    cell.attack();

    const state = cell.getState();

    return state;
  }

  getCellAt(x, y) {
    if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
      throw Error('Invalid coordinate.');
    }

    return this.#board[x][y];
  }

  isEliminated() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
