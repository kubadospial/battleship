import { ShipDamage } from '../../../../utils';
import { gridStub } from '../../grid/grid.stub';
import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import { HitState } from './hit.state';

describe('HitState', () => {
  let state: HitState;

  it('counts hits for destroyer', () => {
    const ship = new Destroyer('test');
    const grid = gridStub();
    const nArr = [...grid.get('A')!];
    nArr[0] = ship.id;
    nArr[1] = ship.id;
    nArr[2] = ship.id;
    nArr[3] = ship.id;
    grid.set('A', nArr);

    const destroyers = new Map([[0, ship]]);
    const battleships = new Map([[0, new Battleship('test2')]]);
    state = new HitState(grid, battleships, destroyers);

    expect(state.hit(1, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(2, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(3, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(4, 'A')).toEqual(ShipDamage.DESTROYED);
    expect(state.destroyersSunk).toEqual(1);
    expect(state.battleShipsSunk).toEqual(0);
  });

  it('counts hits for battleship', () => {
    const ship = new Battleship('test');
    const grid = gridStub();
    const nArr = [...grid.get('A')!];
    nArr[0] = ship.id;
    nArr[1] = ship.id;
    nArr[2] = ship.id;
    nArr[3] = ship.id;
    nArr[4] = ship.id;
    grid.set('A', nArr);

    const destroyers = new Map([[0, new Destroyer('test2')]]);
    const battleships = new Map([[0, ship]]);
    state = new HitState(grid, battleships, destroyers);

    expect(state.hit(1, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(2, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(3, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(4, 'A')).toEqual(ShipDamage.HIT);
    expect(state.hit(5, 'A')).toEqual(ShipDamage.DESTROYED);
    expect(state.destroyersSunk).toEqual(0);
    expect(state.battleShipsSunk).toEqual(1);
  });

  it('returns miss if no ship found', () => {
    const grid = gridStub();
    const destroyers = new Map([[0, new Destroyer('test2')]]);
    const battleships = new Map([[0, new Battleship('test')]]);
    state = new HitState(grid, battleships, destroyers);

    expect(state.hit(1, 'A')).toEqual(ShipDamage.MISS);
    expect(state.destroyersSunk).toEqual(0);
    expect(state.battleShipsSunk).toEqual(0);
  });
});
