import { ShipOrientation } from '../../../../utils';
import { gridStub } from '../../grid/grid.stub';
import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import { ShipsState } from './ships.state';

describe('ShipsState', () => {
  let state: ShipsState;

  beforeEach(() => {
    const grid = gridStub();
    const battlships = new Map([[0, new Battleship('t')]]);
    const destroyers = new Map([
      [0, new Destroyer('t')],
      [1, new Destroyer('t')],
    ]);
    state = new ShipsState(grid, battlships, destroyers);
  });

  it('adds destroyers', () => {
    state.placeDestroyer(ShipOrientation.HORIZONTAL, 'A', 1);
    expect(state.destroyersPlaced).toEqual(1);
    expect(state.battleshipsPlaced).toEqual(0);
  });

  it('adds battleship', () => {
    state.placeBattleship(ShipOrientation.HORIZONTAL, 'A', 1);
    expect(state.destroyersPlaced).toEqual(0);
    expect(state.battleshipsPlaced).toEqual(1);
  });
});
