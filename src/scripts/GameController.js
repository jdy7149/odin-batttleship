import Player from './Player';

class GameController {
  #user;
  #computer;
  #isEnd;

  constructor() {
    this.#user = new Player();
    this.#computer = new Player();
    this.#isEnd = false;

    // Place ships for both players at predetermined coordinates
    [this.#user, this.#computer].forEach((player) => {
      const gameboard = player.getGameboard();

      gameboard.placeShip(0, 0, 1, 1);
      gameboard.placeShip(2, 2, 2, 2);
      gameboard.placeShip(3, 3, 9, 9);
      gameboard.placeShip(9, 9, 3, 3);
      gameboard.placeShip(2, 2, 5, 6);
      gameboard.placeShip(6, 7, 1, 1);
      gameboard.placeShip(8, 9, 9, 9);
      gameboard.placeShip(0, 0, 6, 8);
      gameboard.placeShip(7, 9, 7, 7);
      gameboard.placeShip(4, 7, 5, 5);
    });
  }

  attackComputer(x, y) {
    const comGameboard = this.#computer.getGameboard();

    const result = comGameboard.receiveAttack(x, y);

    if (comGameboard.isEliminated()) {
      this.#isEnd = true;
    }

    return result;
  }

  randomAttackUser() {
    const userGameboard = this.#user.getGameboard();

    while (true) {
      const [x, y] = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];

      const randomCell = userGameboard.getCellAt(x, y);

      if (randomCell.isAttacked()) {
        continue;
      }

      randomCell.attack();

      if (userGameboard.isEliminated()) {
        this.#isEnd = true;
      }

      return randomCell.getState();
    }
  }

  isEnd() {
    return this.#isEnd;
  }

  getUser() {
    return this.#user;
  }

  getComputer() {
    return this.#computer;
  }
}

export default GameController;
