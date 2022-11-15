import { gridStub } from '../../grid/grid.stub';
import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import { Ship } from '../../ships/ship.entity';
import { HitUtils } from './hit-utils.entity';

describe('HitUtils', () => {
  let util: HitUtils;

  const init = () => {
    const grid = gridStub();
    util = new HitUtils(grid);
  };

  beforeEach(init);

  it('finds a ship', () => {
    const ship = new Destroyer('test');
    const shipId = ship.id;

    const ships = new Map<number, Ship>([[0, ship]]);
    expect(util.findShip(ships, shipId)).toBeInstanceOf(Destroyer);
  });

  it('returns undefined when ship is not found', () => {
    const ship = new Destroyer('test');
    const shipId = Symbol('test');

    const ships = new Map<number, Ship>([[0, ship]]);
    expect(util.findShip(ships, shipId)).toBeUndefined();
  });

  it('returns ships id', () => {
    const ship = new Destroyer('test');
    const grid = gridStub();
    const nArr = [...grid.get('A')!];
    nArr[3] = ship.id;
    grid.set('A', nArr);
    util = new HitUtils(grid);

    expect(util.getShipId('A', 4)).toEqual(ship.id);
  });

  it('detects if the ship is destroyer', () => {
    const ship = new Destroyer('test');
    expect(util.isDestroyer(ship.id)).toBeTruthy();

    const battleship = new Battleship('test2');
    expect(util.isDestroyer(battleship.id)).toBeFalsy();
  });

  it('detects if the ship is battleship', () => {
    const battleship = new Battleship('test');
    expect(util.isBattleship(battleship.id)).toBeTruthy();

    const ship = new Destroyer('test2');
    expect(util.isBattleship(ship.id)).toBeFalsy();
  });
});
