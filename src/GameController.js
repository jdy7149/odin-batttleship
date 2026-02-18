import Player from './Player'
import AXIS from './AXIS';

class GameController {
  #user;

  #computer;
  
  #activePlayer;

  #isEnd;

  constructor() {
    this.#user = new Player();
    this.#computer = new Player();
    this.#activePlayer = this.#user;
    this.#isEnd = false;

    // Place ships for both players at predetermined coordinates
    [this.#user, this.#computer].forEach((player) => {
      const gameboard = player.getGameboard();

      gameboard.placeShip(0, 1, AXIS.HORIZONTAL, 1);
      gameboard.placeShip(2, 2, AXIS.HORIZONTAL, 1);
      gameboard.placeShip(3, 9, AXIS.HORIZONTAL, 1);
      gameboard.placeShip(9, 3, AXIS.HORIZONTAL, 1);
      gameboard.placeShip(2, 5, AXIS.HORIZONTAL, 2);
      gameboard.placeShip(6, 1, AXIS.VERTICAL, 2);
      gameboard.placeShip(8, 9, AXIS.VERTICAL, 2);
      gameboard.placeShip(0, 6, AXIS.HORIZONTAL, 3);
      gameboard.placeShip(7, 7, AXIS.VERTICAL, 3);
      gameboard.placeShip(4, 5, AXIS.VERTICAL, 3);
    });
  }

  getActivePlayer() {
    return this.#activePlayer;
  }

  playRound(x, y) {
    if (this.#isEnd) return;

    const inactivePlayer = this.#activePlayer === this.#user ? this.#computer : this.#user;

    const gameboard = inactivePlayer.getGameboard();

    gameboard.receiveAttack(x, y);

    if (gameboard.isEliminated()) {
      this.#isEnd = true;
      return;
    }
    
    this.#switchPlayerTurn();
  }

  #switchPlayerTurn() {
    this.#activePlayer = this.#activePlayer === this.#user ? this.#computer : this.#user;
  }
}

export default GameController;
