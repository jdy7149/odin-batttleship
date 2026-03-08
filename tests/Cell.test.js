import { describe, expect, test } from '@jest/globals';

import Cell from '../src/Cell';
import CELL_STATE from '../src/CELL_STATE';
import Ship from '../src/Ship';

describe('Cell', () => {
  describe('constructor', () => {
    test('is not marked as attacked when created', () => {
      const cell = new Cell();

      expect(cell.isAttacked()).toBe(false);
    });

    test('is not marked as occupied when created', () => {
      const cell = new Cell();

      expect(cell.isOccupied()).toBe(false);
    });
  });

  describe('attack', () => {
    test('marks attacked cell as attacked', () => {
      const cell = new Cell();

      cell.attack();

      expect(cell.isAttacked()).toBe(true);
    });

    test('marks attacked cell as missed when no ship', () => {
      const cell = new Cell();

      cell.attack();

      expect(cell.getState()).toBe(CELL_STATE.MISSED);
    });

    test('marks attacked cell as hit when ship exists and not sunk', () => {
      const cell = new Cell();

      cell.setShip(new Ship(2));

      cell.attack();

      expect(cell.getState()).toBe(CELL_STATE.HIT);
    });

    test('marks attacked cell as sunk when ship exists and sunk', () => {
      const cell = new Cell();

      cell.setShip(new Ship(1));

      cell.attack();

      expect(cell.getState()).toBe(CELL_STATE.SUNK);
    });
  });

  describe('block', () => {
    test('marks cell as occupied', () => {
      const cell = new Cell();

      cell.block();

      expect(cell.isOccupied()).toBe(true);
    });
  });

  describe('setShip', () => {
    test('marks cell as occupied', () => {
      const cell = new Cell();

      cell.setShip(new Ship(1));

      expect(cell.isOccupied()).toBe(true);
    });
  });
});
