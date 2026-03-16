import { describe, expect, test } from '@jest/globals';

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
    test('throws error when given invalid coordinate', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.placeShip(1, -1, AXIS.HORIZONTAL, 1)).toThrow();
      expect(() => gameboard.placeShip(-1, 0, AXIS.VERTICAL, 2)).toThrow();
      expect(() => gameboard.placeShip(2, 10, AXIS.HORIZONTAL, 3)).toThrow();
      expect(() => gameboard.placeShip(9, 10, AXIS.VERTICAL, 4)).toThrow();
    });

    test('throws error when given wrong axis', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.placeShip(3, 3, '', 2)).toThrow();
      expect(() => gameboard.placeShip(4, 5, 'up', 2)).toThrow();
      expect(() => gameboard.placeShip(1, 1, 'diagonal', 3)).toThrow();
    });

    test('throws error when invalid length', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 0)).toThrow();
      expect(() => gameboard.placeShip(4, 9, AXIS.VERTICAL, 5)).toThrow();
    });

    test('throws error when ship exceeds gameboard boudary', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.placeShip(8, 8, AXIS.HORIZONTAL, 4)).toThrow();
    });

    test('throws error placing ship on occupied cells', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(4, 4, AXIS.HORIZONTAL, 4);

      expect(() => gameboard.placeShip(4, 4, AXIS.VERTICAL, 3)).toThrow();
      expect(() => gameboard.placeShip(3, 5, AXIS.VERTICAL, 3)).toThrow();
    });

    test('places ship horizontally', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const shouldHaveShip = i === 1 && j >= 1 && j <= 4;

          if (shouldHaveShip) {
            const ship = cell.getShip();
            expect(ship).not.toBeNull();
            expect(ship.getLength()).toBe(4);
            expect(ship.isSunk()).toBe(false);
          } else {
            expect(cell.getShip()).toBeNull();
          }
        }
      }
    });

    test('places ship vertically', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.VERTICAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const shouldHaveShip = j === 1 && i >= 1 && i <= 4;

          if (shouldHaveShip) {
            const ship = cell.getShip();
            expect(ship).not.toBeNull();
            expect(ship.getLength()).toBe(4);
            expect(ship.isSunk()).toBe(false);
          } else {
            expect(cell.getShip()).toBeNull();
          }
        }
      }
    });

    test('marks adjacent cells as occupied (horizontal)', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isAdjacent = i >= 0 && i <= 2 && j >= 0 && j <= 5;

          if (isAdjacent) {
            expect(cell.isOccupied()).toBe(true);
          } else {
            expect(cell.isOccupied()).toBe(false);
          }
        }
      }
    });

    test('marks adjacent cells as occupied (vertical)', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(3, 2, AXIS.VERTICAL, 3);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);

          const isAdjacent = i >= 2 && i <= 6 && j >= 1 && j <= 3;

          if (isAdjacent) {
            expect(cell.isOccupied()).toBe(true);
          } else {
            expect(cell.isOccupied()).toBe(false);
          }
        }
      }
    });
  });

  describe('receiveAttack', () => {
    test('throws error on invalid coordinate', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.receiveAttack(-1, 0)).toThrow();
      expect(() => gameboard.receiveAttack(4, 10)).toThrow();
    });

    test('throws error when attacking same cell twice', () => {
      const gameboard = new Gameboard();

      gameboard.receiveAttack(1, 1);

      expect(() => gameboard.receiveAttack(1, 1)).toThrow();
    });

    test('returns MISSED when no ship', () => {
      const gameboard = new Gameboard();

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.MISSED);
    });

    test('returns HIT when ship is hit but not sunk', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.VERTICAL, 2);

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.HIT);
    });

    test('returns SUNK when ship is sunk', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 1);

      expect(gameboard.receiveAttack(1, 1)).toBe(CELL_STATE.SUNK);
    });
  });

  describe('getCellAt', () => {
    test('throws error on invalid coordinate', () => {
      const gameboard = new Gameboard();

      expect(() => gameboard.getCellAt(0, -1)).toThrow();
      expect(() => gameboard.getCellAt(10, 3)).toThrow();
    });
  });
});
