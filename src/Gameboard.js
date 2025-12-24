import AXIS from './AXIS';
import Cell from './Cell';

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

    
  }
}

export default Gameboard;
