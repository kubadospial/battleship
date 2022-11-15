import { ShipDamage } from '../../../utils';
import { Destroyer } from './destroyer.entity';

describe('Destroyer', () => {
  let ship: Destroyer;

  beforeEach(() => {
    ship = new Destroyer('test');
  });

  it('counts hits', () => {
    ship.hit();
    expect(ship['_hitCount']).toEqual(1);
  });

  it('is destroyed once it reaches 4 hits', () => {
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.HIT);
    expect(ship.hit()).toEqual(ShipDamage.DESTROYED);
  });
});
