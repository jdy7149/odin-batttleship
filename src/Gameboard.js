import Cell from './Cell';
import CELL_STATE from './CELL_STATE';
import Ship from './Ship';

class Gameboard {
  #board;
  #ships;

  constructor() {
    this.#board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => new Cell()),
    );
    this.#ships = [];
  }

  placeShip(startRow, endRow, startCol, endCol) {
    if (
      !this.#isValidCoordinate(startRow) ||
      !this.#isValidCoordinate(endRow) ||
      !this.#isValidCoordinate(startCol) ||
      !this.#isValidCoordinate(endCol)
    ) {
      throw Error('Invalid coordinate. It should be between 0 and 9');
    }

    if (startRow > endRow || startCol > endCol) {
      throw Error('Start point should be less than end point.');
    }

    if (endRow - startRow > 0 && endCol - startCol > 0) {
      throw Error('Ship should be placed either horizontally or vertically.');
    }

    const length = Math.max(endRow - startRow + 1, endCol - startCol + 1);

    if (length > 4) {
      throw Error('Max length of ship is 4.');
    }

    const ship = new Ship(length);

    // Gather coordinates where ship will be placed
    const placedCoords = [];

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        const cell = this.#board[i][j];

        if (cell.isOccupied()) throw Error('Cells are already occupied.');

        placedCoords.push([i, j]);
      }
    }

    // Place ship
    placedCoords.forEach(([x, y]) => this.#board[x][y].setShip(ship));

    // Gather coordinates which will be blocked
    const blockedCoords = [];

    for (let i = startRow - 1; i <= endRow + 1; i++) {
      for (let j = startCol - 1; j <= endCol + 1; j++) {
        const isPlacedRow = i >= startRow && i <= endRow;
        const isPlacedCol = j >= startCol && j <= endCol;

        if (
          !this.#isValidCoordinate(i) ||
          !this.#isValidCoordinate(j) ||
          (isPlacedRow && isPlacedCol)
        )
          continue;

        blockedCoords.push([i, j]);
      }
    }

    // Block cells
    blockedCoords.forEach(([x, y]) => this.#board[x][y].block());

    this.#ships.push(ship);
  }

  receiveAttack(x, y) {
    if (!this.#isValidCoordinate(x) || !this.#isValidCoordinate(y)) {
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
    if (!this.#isValidCoordinate(x) || !this.#isValidCoordinate(y)) {
      throw Error('Invalid coordinate.');
    }

    return this.#board[x][y];
  }

  isEliminated() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  #isValidCoordinate(k) {
    return k >= 0 && k < 10;
  }
}

export default Gameboard;
