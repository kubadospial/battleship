import { DESTROYERS_LENGTH, ROW_HEADERS } from '../../../../utils';
import { gridStub } from '../../grid/grid.stub';
import { CollisionDetector } from './collision-detector.entity';

describe('CollisionDetector', () => {
  let detector: CollisionDetector;

  it('finds vertical collision', () => {
    const grid = gridStub();
    detector = new CollisionDetector(grid);
    const col = [...grid.get('A')!];
    col[0] = Symbol();
    grid.set('A', col);

    expect(
      detector.vertical(grid.get('A')!, 1, DESTROYERS_LENGTH)
    ).toBeTruthy();

    expect(detector.vertical(grid.get('A')!, 2, DESTROYERS_LENGTH)).toBeFalsy();
  });

  it('finds horizontal collision', () => {
    const grid = gridStub();
    detector = new CollisionDetector(grid);
    const col = [...grid.get('A')!];
    col[0] = Symbol();
    grid.set('A', col);
    const headers = [...ROW_HEADERS].splice(0, DESTROYERS_LENGTH);

    expect(detector.horizontal(headers, 1)).toBeTruthy();
    expect(detector.horizontal(headers, 2)).toBeFalsy();
  });
});
