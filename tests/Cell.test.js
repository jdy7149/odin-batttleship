import { describe, expect, test, jest } from '@jest/globals';

import Cell from '../src/Cell';

describe('Cell', () => {
  test('is not marked as attacked when created', () => {
    const cell = new Cell();

    expect(cell.isAttacked()).toBe(false);
  });

  test('becomes attacked after being attacked', () => {
    const cell = new Cell();

    cell.getAttacked();

    expect(cell.isAttacked()).toBe(true);
  });

  test('hits ship once only if ship exists', () => {
    const cell = new Cell();

    const ship = { hit: jest.fn() };
    cell.setShip(ship);

    cell.getAttacked();

    expect(ship.hit).toHaveBeenCalledTimes(1);
  });

  test('does not hit ship when cell is already attacked before', () => {
    const cell = new Cell();

    const ship = { hit: jest.fn() };
    cell.setShip(ship);

    cell.getAttacked();
    cell.getAttacked();

    expect(ship.hit).toHaveBeenCalledTimes(1);
  });
});
