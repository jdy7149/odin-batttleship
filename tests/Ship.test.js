import { describe, expect, test } from '@jest/globals';

import Ship from '../src/Ship';

describe('Ship', () => {
  test('is not sunk when created', () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);
  });

  test('is not sunk after fewer hits than length', () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test('is sunk after hits are equal to length', () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });

  test('is still sunk after hits are more than length', () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
