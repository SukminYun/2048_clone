import { describe, expect, it } from 'vitest';

import { moveRight } from './moveTile';

describe('moveRight', () => {
  it('should move the tile to the right position', () => {
    const initialBoard = [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const expectedBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = moveRight(initialBoard);
    expect(result).toEqual(expectedBoard);
  });

  it('should combine tiles if they have the same value', () => {
    const initialBoard = [
      [0, 0, 0, 0],
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const expectedBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = moveRight(initialBoard);
    expect(result).toEqual(expectedBoard);
  });

  it('should handle multiple moves correctly', () => {
    const initialBoard = [
      [0, 2, 0, 2],
      [0, 2, 2, 0],
      [2, 0, 2, 0],
      [2, 2, 2, 2],
    ];
    const expectedBoard = [
      [0, 0, 0, 4],
      [0, 0, 0, 4],
      [0, 0, 0, 4],
      [0, 0, 4, 4],
    ];
    const result = moveRight(initialBoard);
    expect(result).toEqual(expectedBoard);
  });

  it('should handle a full row correctly', () => {
    const initialBoard = [
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const expectedBoard = [
      [0, 0, 4, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = moveRight(initialBoard);
    expect(result).toEqual(expectedBoard);
  });
});
