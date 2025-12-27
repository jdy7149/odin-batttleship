import { describe, expect, test, jest } from '@jest/globals';

import Cell from '../src/Cell';

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
    test('becomes attacked after being attacked', () => {
      const cell = new Cell();

      cell.attack();

      expect(cell.isAttacked()).toBe(true);
    });

    test('hits ship once only if ship exists', () => {
      const cell = new Cell();

      const ship = { hit: jest.fn() };
      cell.setShip(ship);

      cell.attack();

      expect(ship.hit).toHaveBeenCalledTimes(1);
    });

    test('does not hit ship when cell is already attacked before', () => {
      const cell = new Cell();

      const ship = { hit: jest.fn() };
      cell.setShip(ship);

      cell.attack();
      cell.attack();

      expect(ship.hit).toHaveBeenCalledTimes(1);
    });
  });

  describe('occupy', () => {
    const cell = new Cell();

    cell.occupy();

    expect(cell.isOccupied()).toBe(true);
  });
});
