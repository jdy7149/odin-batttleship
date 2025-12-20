import Cell from "./Cell";

class Gameboard {
  #board;
  
  constructor() {
    this.#board = Array.from({ length: 10 }, () => 
      Array.from({ length: 10 }, () => new Cell())
    );
  }

  receiveAttack(x, y) {
    const cell = this.#board[x][y];

    cell.getAttacked();
  }

  getCellAt(x, y) {
    return this.#board[x][y];
  }

}

export default Gameboard;

