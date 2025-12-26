import AXIS from './AXIS';
import Cell from './Cell';
import Ship from './Ship';

class Gameboard {
  #board;

  constructor() {
    this.#board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => new Cell()),
    );
  }

  receiveAttack(x, y) {
    const cell = this.#board[x][y];

    cell.getAttacked();
  }

  getCellAt(x, y) {
    return this.#board[x][y];
  }

  placeShip(x, y, axis, length) {
    if (!(x >= 0 && x < 10) || !(y >= 0 && y < 10)) {
      throw Error('Invalid coordinate. x and y should be between 0 and 9.');
    }

    if (!(length >= 1 && length <= 4)) {
      throw Error('Invalid length. The length should be between 1 and 4.');
    }

    const ship = new Ship(length);

    if (axis === AXIS.HORIZONTAL) {
      if (y + length >= 10) {
        throw Error('Could not place a ship out of the gameboard.');
      }

      for (let i = y; i < y + length; i++) {
        const cell = this.#board[x][i];
        if (cell.isOccupied()) {
          throw Error('Could not place a ship at already occupied cell.');
        }

        cell.setShip(ship);
      }

      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + length; j++) {
          const isValidRow = i >= 0 && i < 10;
          const isValidCol = j >= 0 && j < 10;

          if (isValidRow && isValidCol) {
            this.#board[i][j].occupy();
          }
        }
      }
    } else if (axis === AXIS.VERTICAL) {
      if (x + length >= 10) {
        throw Error('Could not place a ship out of the gameboard.');
      }

      for (let i = x; i < x + length; i++) {
        const cell = this.#board[i][y];

        if (cell.isOccupied()) {
          throw Error('Could not place a ship at already occupied cell.');
        }

        cell.setShip(ship);
      }

      for (let i = x - 1; i <= x + length; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          const isValidRow = i >= 0 && i < 10;
          const isValidCol = j >= 0 && j < 10;

          if (isValidRow && isValidCol) {
            this.#board[i][j].occupy();
          }
        }
      }
    }
  }
}

export default Gameboard;
