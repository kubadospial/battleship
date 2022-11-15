import { Grid } from './grid.vo';

describe('Grid', () => {
  beforeEach(() => {});

  it('throws error when grid is too big', () => {
    expect(() => Grid.generate(10, 11)).toThrowError();
    expect(() => Grid.generate(11, 10)).toThrowError();
  });

  it('throws error when grid is too small', () => {
    expect(() => Grid.generate(10, -1)).toThrowError();
    expect(() => Grid.generate(-1, 10)).toThrowError();

    expect(() => Grid.generate(10, 0)).toThrowError();
    expect(() => Grid.generate(0, 10)).toThrowError();
  });
});
