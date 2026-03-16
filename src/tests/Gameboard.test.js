import { describe, expect, test } from '@jest/globals';

import Ship from '../scripts/Ship';
import Gameboard from '../scripts/Gameboard';
import CELL_STATE from '../scripts/CELL_STATE';
import AXIS from '../scripts/AXIS';

describe('Gameboard', () => {
  describe('constructor', () => {
    test('has 10 x 10 empty cell when created', () => {
      const gameboard = new Gameboard();

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          expect(cell).toBeDefined();
          expect(cell.getShip()).toBeNull();
          expect(cell.isAttacked()).toBe(false);
          expect(cell.isOccupied()).toBe(false);
        }
      }

      expect(gameboard.isEliminated()).toBe(true);
    });
  });

  describe('placeShip', () => {
    test('throws error when given x or y which is less than 0 or greater than 9', () => {
      const gameboard = new Gameboard();
      const errMsg = /Invalid coordinate/i;

      expect(() => gameboard.placeShip(1, -1, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(-1, 0, AXIS.VERTICAL, 2)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(2, 10, AXIS.HORIZONTAL, 3)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(9, 10, AXIS.VERTICAL, 4)).toThrow(
        errMsg,
      );
    });

    test('throws error when given wrong direction', () => {
      const gameboard = new Gameboard();
      const errMsg = /wrong direction/i;

      expect(() => gameboard.placeShip(3, 3, '')).toThrow(errMsg);
      expect(() => gameboard.placeShip(4, 5, 'up')).toThrow(errMsg);
      expect(() => gameboard.placeShip(1, 1, 'diagonal')).toThrow(errMsg);
    });

    test('throws error when length is less than 1 or greater than 4', () => {
      const gameboard = new Gameboard();
      const errMsg = /length/i;

      expect(() => gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 0)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(4, 9, AXIS.VERTICAL, 5)).toThrow(errMsg);
    });

    test('cannot place ship at occupied cell', () => {
      const gameboard = new Gameboard();
      const errMsg = /occupied/i;

      gameboard.placeShip(4, 4, AXIS.HORIZONTAL, 4);

      expect(() => gameboard.placeShip(2, 5, AXIS.VERTICAL, 2)).toThrow(errMsg);
      expect(() => gameboard.placeShip(4, 4, AXIS.VERTICAL, 5)).toThrow(errMsg);
      expect(() => gameboard.placeShip(3, 6, AXIS.VERTICAL, 3)).toThrow(errMsg);
    });

    test('places ship', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      for (let i = 1; i <= 4; i++) {
        const cell = gameboard.getCellAt(1, i);

        const ship = cell.getShip();

        expect(ship).toBeInstanceOf(Ship);
        expect(ship.getLength()).toBe(4);
        expect(ship.isSunk()).toBe(false);
      }
    });

    test('places ship horizontally on correct cells only', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isPlacedRow = i === 1;
          const isPlacedCol = j >= 1 && j <= 4;

          if (isPlacedRow && isPlacedCol) {
            expect(cell.getShip()).not.toBeNull();
          } else {
            expect(cell.getShip()).toBeNull();
          }
        }
      }
    });

    test('places ship vertically on correct cells only', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.VERTICAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isPlacedRow = i >= 1 && i <= 4;
          const isPlacedCol = j === 1;

          if (isPlacedRow && isPlacedCol) {
            expect(cell.getShip()).not.toBeNull();
          } else {
            expect(cell.getShip()).toBeNull();
          }
        }
      }
    });

    test('marks all adjacent cells as occupied (horizontally)', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isAdjacentRow = i >= 0 && i <= 2;
          const isAdjacentCol = j >= 0 && j <= 5;

          if (isAdjacentRow && isAdjacentCol) {
            expect(cell.isOccupied()).toBe(true);
          } else {
            expect(cell.isOccupied()).toBe(false);
          }
        }
      }
    });

    test('marks all adjacent cells as occupied (vertically)', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(3, 2, AXIS.VERTICAL, 3);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isAdjacentRow = i >= 2 && i <= 7;
          const isAdjacentCol = j >= 2 && j <= 4;

          if (isAdjacentRow && isAdjacentCol) {
            expect(cell.isOccupied()).toBe(true);
          } else {
            expect(cell.isOccupied()).toBe(false);
          }
        }
      }
    });
  });

  describe('receiveAttack', () => {
    test('invalid coordinate is given', () => {
      const gameboard = new Gameboard();
      const errMsg = /invalid coordinate/i;

      expect(() => gameboard.receiveAttack(-1, 0)).toThrow(errMsg);
      expect(() => gameboard.receiveAttack(4, 10)).toThrow(errMsg);
    });

    test('throw error when attacking cell which is already attacked before', () => {
      const gameboard = new Gameboard();

      const errMsg = /attacked/i;

      gameboard.receiveAttack(1, 1);

      expect(() => gameboard.receiveAttack(1, 1)).toThrow(errMsg);
    });

    test('missed when there is no ship', () => {
      const gameboard = new Gameboard();

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.MISSED);
    });

    test('hit when ship is hit but not sunk', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 2, 1, 1);

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.HIT);
    });

    test('sunk when ship is sunk', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, 1, 1);

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.SUNK);
    });
  });

  describe('getCellAt', () => {
    test('invalid coordinate is given', () => {
      const gameboard = new Gameboard();
      const errMsg = /invalid coordinate/i;

      expect(() => gameboard.getCellAt(0, -1)).toThrow(errMsg);
      expect(() => gameboard.getCellAt(10, 3)).toThrow(errMsg);
    });
  });
});
