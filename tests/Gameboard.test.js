import { describe, expect, test } from '@jest/globals';

import Ship from '../src/Ship';
import AXIS from '../src/AXIS';
import Gameboard from '../src/Gameboard';

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
    });
  });

  describe('placeShip', () => {
    test('given invalid coordinate', () => {
      const gameboard = new Gameboard();
      const errMsg = /Invalid coordinate/i;

      expect(() => gameboard.placeShip(-1, -1, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(-1, 0, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(0, -1, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(10, 10, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(10, 9, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(9, 10, AXIS.HORIZONTAL, 1)).toThrow(
        errMsg,
      );
    });

    test('given invalid length', () => {
      const gameboard = new Gameboard();
      const errMsg = /Invalid length/i;

      expect(() => gameboard.placeShip(0, 0, AXIS.HORIZONTAL, -1)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(0, 0, AXIS.HORIZONTAL, 5)).toThrow(
        errMsg,
      );
    });

    test('places ship horizontally on correct cells only', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.HORIZONTAL, 4);

      const ship = gameboard.getCellAt(1, 1).getShip();
      expect(ship).toBeInstanceOf(Ship);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);
          
          const isPlacedRow = i === 1;
          const isPlacedCol = j >= 1 && j <= 4;

          if (isPlacedRow && isPlacedCol) {
            expect(cell.getShip()).toBe(ship);
          } else {
            expect(cell.getShip()).toBeNull();
          }
        }
      }
    });

    test('places ship vertically on correct cells only', () => {
      const gameboard = new Gameboard();

      gameboard.placeShip(1, 1, AXIS.VERTICAL, 4);

      const ship = gameboard.getCellAt(1, 1).getShip();
      expect(ship).toBeInstanceOf(Ship);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = gameboard.getCellAt(i, j);
          
          const isPlacedRow = i >= 1 && i <= 4;
          const isPlacedCol = j === 1;

          if (isPlacedRow && isPlacedCol) {
            expect(cell.getShip()).toBe(ship);
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

      gameboard.placeShip(3, 3, AXIS.VERTICAL, 4);

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

    test('cannot place ship out of bound', () => {
      const gameboard = new Gameboard();
      const errMsg = /out of/i;

      expect(() => gameboard.placeShip(0, 8, AXIS.HORIZONTAL, 3)).toThrow(
        errMsg,
      );
      expect(() => gameboard.placeShip(4, 9, AXIS.HORIZONTAL, 2)).toThrow(
        errMsg,
      );

      expect(() => gameboard.placeShip(8, 0, AXIS.VERTICAL, 3)).toThrow(errMsg);
      expect(() => gameboard.placeShip(9, 4, AXIS.VERTICAL, 2)).toThrow(errMsg);
    });

    test('cannot place ship at occupied cell', () => {
      const gameboard = new Gameboard();
      const errMsg = /occupied/i;

      gameboard.placeShip(4, 4, AXIS.HORIZONTAL, 1);

      expect(() => gameboard.placeShip(4, 4, AXIS.VERTICAL, 3)).toThrow(errMsg);
      expect(() => gameboard.placeShip(2, 3, AXIS.VERTICAL, 2)).toThrow(errMsg);
      expect(() => gameboard.placeShip(5, 2, AXIS.HORIZONTAL, 2)).toThrow(
        errMsg,
      );
    });
  });
});
