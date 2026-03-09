import CELL_STATE from './CELL_STATE';
import GameController from './GameController';

let game = new GameController();

let user = game.getUser();
let com = game.getComputer();

let isUserTurn = true;

// Display components
const userBoardElement = document.querySelector('#user');
const comBoardElement = document.querySelector('#com');

// Render each player's board
const renderUserBoard = () => {
  // Clear grid
  userBoardElement.replaceChildren();

  const board = user.getGameboard();

  // Render board
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = board.getCellAt(i, j);
      const state = cell.getState();

      const cellElement = document.createElement('div');
      cellElement.classList.add('cell', state);

      if (cell.getShip()) {
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

  const board = com.getGameboard();

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

// Player attacks user on random coordinate
const playComputerTurn = () => {
  let result = null;

  do {
    result = game.randomAttackUser();

    renderUserBoard();
  } while (result !== CELL_STATE.MISSED);

  isUserTurn = true;
};

// Click event for computer's cell
const handleAttack = (x, y) => {
  const comBoard = com.getGameboard();

  if (comBoard.getCellAt(x, y).isAttacked()) {
    return;
  }

  const result = comBoard.receiveAttack(x, y);

  renderComputerBoard();

  if (result === CELL_STATE.MISSED) {
    isUserTurn = false;
    playComputerTurn();
  }
};

const reset = () => {
  game = new GameController();
  isUserTurn = true;

  user = game.getUser();
  com = game.getComputer();

  renderUserBoard();
  renderComputerBoard();
};

// Add click event to computer's cells
comBoardElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('cell')) return;

  if (com.getGameboard().isEliminated() || !isUserTurn) return;

  const x = Number(evt.target.dataset.x);
  const y = Number(evt.target.dataset.y);

  handleAttack(x, y);
});

// Add reset event
document.querySelector('.reset').addEventListener('click', () => {
  reset();
});
