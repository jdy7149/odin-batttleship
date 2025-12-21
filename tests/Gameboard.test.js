import { describe, expect, test } from '@jest/globals';

import AXIS from '../src/Axis';
import Gameboard from '../src/Gameboard';

describe('Gameboard', () => {
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

  test('places ship with given length at given coordinate and axis', () => {

  });
});

describe('placeShip', () => {
  test('given invalid coordinate', () => {
    const gameboard = new Gameboard();
    const errMsg = 'Invalid coordinate. x and y should be between 0 and 9';

    expect(() => gameboard.placeShip(-1, -1, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
    expect(() => gameboard.placeShip(-1, 0, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
    expect(() => gameboard.placeShip(0, -1, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
    expect(() => gameboard.placeShip(10, 10, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
    expect(() => gameboard.placeShip(10, 9, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
    expect(() => gameboard.placeShip(9 , 10, AXIS.HORIZONTAL, 1))
      .toThrow(errMsg);
  });

  test('given invalid length', () => {
    const gameboard = new Gameboard();
    const errMsg = 'Invalid length of ship. The length of ship should be between 1 and 4';

    expect(() => gameboard.placeShip(0, 0, AXIS.HORIZONTAL, -1)).toThrow(errMsg);
    expect(() => gameboard.placeShip(0, 0, AXIS.HORIZONTAL, 5)).toThrow(errMsg);
  });

  test('not enough cells for given length', () => {

  });

  test('place ship with given length at given coordinate along given axis')
});
