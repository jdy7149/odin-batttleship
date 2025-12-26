import Gameboard from "./Gameboard";

class Player {
  #gameboard;

  constructor() {
    this.#gameboard = new Gameboard();
  }

  getGameboard() {
    return this.#gameboard;
  }
}

export default Player;
