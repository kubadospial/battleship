import { ShipDamage } from '../../../utils';
import { Battleship } from './battleship.entity';

describe('Battleship', () => {
  let ship: Battleship;

  beforeEach(() => {
    ship = new Battleship('test');
  });

  it('counts hits', () => {
    ship.hit();
    expect(ship['_hitCount']).toEqual(1);
  });

  it('is destroyed once it reaches 5 hits', () => {
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.DESTROYED);
  });
});
