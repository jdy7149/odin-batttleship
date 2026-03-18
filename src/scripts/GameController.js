import AXIS from './AXIS';
import CELL_STATE from './CELL_STATE';
import Player from './Player';

import { shuffleArray } from './helper';

class GameController {
  #user;
  #computer;
  #isUserTurn;
  #isEnd;
  #randomCoords;

  constructor() {
    this.#user = new Player();
    this.#computer = new Player();
    this.#isUserTurn = true;
    this.#isEnd = false;

    // Random coords which computer will attack on user's gameboard
    this.#randomCoords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#randomCoords.push([i, j]);
      }
    }

    shuffleArray(this.#randomCoords);

    // Place computer's ships
    this.randomlyPlaceShips('computer');
    this.randomlyPlaceShips('user');
  }

  attackComputer(x, y) {
    if (this.#isEnd) {
      throw Error('Game has ended.');
    }

    const comGameboard = this.#computer.getGameboard();

    if (comGameboard.getCellAt(x, y).isAttacked()) {
      return null;
    }

    const result = comGameboard.receiveAttack(x, y);

    if (result === CELL_STATE.MISSED) {
      this.#isUserTurn = false;
    }

    if (comGameboard.isEliminated()) {
      this.#isEnd = true;
    }

    return result;
  }

  randomAttackUser() {
    if (this.#isEnd) {
      throw Error('Game has ended.');
    }

    const userGameboard = this.#user.getGameboard();

    const [x, y] = this.#randomCoords.pop();

    const result = userGameboard.receiveAttack(x, y);

    if (result === CELL_STATE.MISSED) {
      this.#isUserTurn = true;
    }

    if (userGameboard.isEliminated()) {
      this.#isEnd = true;
      this.#isUserTurn = true;
    }

    return result;
  }

  randomlyPlaceShips(target) {
    let gameboard = null;

    if (target === 'user') {
      gameboard = this.#user.getGameboard();
    } else if (target === 'computer') {
      gameboard = this.#computer.getGameboard();
    } else {
      return;
    }

    // Place ships on random spots
    const shipCounts = [0, 4, 3, 2, 1];
    let attempts = 2000;

    while (shipCounts.some((cnt) => cnt > 0) && attempts > 0) {
      attempts -= 1;

      const axis = Math.random() < 0.5 ? AXIS.HORIZONTAL : AXIS.VERTICAL;

      const length = Math.floor(Math.random() * 4) + 1;

      if (shipCounts[length] === 0) {
        continue;
      }

      const [x, y] = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];

      try {
        gameboard.placeShip(x, y, axis, length);
      } catch (e) {
        continue;
      }

      shipCounts[length] -= 1;
    }
  }

  isEnd() {
    return this.#isEnd;
  }

  isUserTurn() {
    return this.#isUserTurn;
  }

  getUserBoard() {
    return this.#user.getGameboard();
  }

  getComputerBoard() {
    return this.#computer.getGameboard();
  }
}

export default GameController;
