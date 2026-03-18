import CELL_STATE from './CELL_STATE';
import GameController from './GameController';

let game = new GameController();

let userBoard = game.getUserBoard();
let computerBoard = game.getComputerBoard();

// Display components
const userBoardElement = document.querySelector('#user-board');
const comBoardElement = document.querySelector('#computer-board');

// Render each player's board
const renderUserBoard = () => {
  // Clear grid
  userBoardElement.replaceChildren();

  const board = userBoard;

  // Render board
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = board.getCellAt(i, j);
      const state = cell.getState();

      const cellElement = document.createElement('div');
      cellElement.classList.add('cell', state);

      if (state === CELL_STATE.IDLE && cell.getShip()) {
        cellElement.classList.add('has-ship');
      }

      cellElement.dataset.x = i;
      cellElement.dataset.y = j;

      userBoardElement.appendChild(cellElement);
    }
  }
};

const renderComputerBoard = () => {
  // Clear grid
  comBoardElement.replaceChildren();

  const board = computerBoard;

  // Render board
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = board.getCellAt(i, j);
      const state = cell.getState();

      const cellElement = document.createElement('div');
      cellElement.classList.add('cell', state);

      if (state === CELL_STATE.IDLE) {
        cellElement.classList.add('clickable');
      }

      cellElement.dataset.x = i;
      cellElement.dataset.y = j;

      comBoardElement.appendChild(cellElement);
    }
  }
};

// Alert the winner of game
const alertWinner = () => {
  const winner = game.isUserTurn() ? 'You' : 'Computer';

  alert(`${winner} wins!`);
};

// Alert game has ended
const alertEnding = () => {
  alert('Game has ended. Please restart game.');
};

// Computer attacks user on random coordinate
const playComputerTurn = () => {
  if (game.isEnd()) {
    alertEnding();
    return;
  }

  const result = game.randomAttackUser();

  renderUserBoard();

  if (game.isEnd()) {
    alertWinner();
    return;
  }

  if (result !== CELL_STATE.MISSED) {
    setTimeout(playComputerTurn, 700);
  }
};

// Click event for computer's cell
const handleAttack = (x, y) => {
  const result = game.attackComputer(x, y);

  if (result === null) return;

  renderComputerBoard();

  if (game.isEnd()) {
    alertWinner();
    return;
  }

  if (result === CELL_STATE.MISSED) {
    setTimeout(() => {
      playComputerTurn();
    }, 600);
  }
};

const reset = () => {
  game = new GameController();

  userBoard = game.getUserBoard();
  computerBoard = game.getComputerBoard();

  renderUserBoard();
  renderComputerBoard();
};

const init = () => {
  reset();

  // Add click event to computer's cells
  comBoardElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('cell')) return;

    if (!game.isUserTurn()) return;

    if (game.isEnd()) {
      alertEnding();
      return;
    }

    const x = Number(evt.target.dataset.x);
    const y = Number(evt.target.dataset.y);

    handleAttack(x, y);
  });

  // Add reset event
  document.querySelector('.reset').addEventListener('click', () => {
    reset();
  });
};

export default init;
