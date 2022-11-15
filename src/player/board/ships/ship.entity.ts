import { ShipDamage, ShipType } from '../../../utils';

export abstract class Ship {
  readonly id: Symbol;
  private _hitCount = 0;

  constructor(
    protected _id: string,
    public size: number,
    private _type: ShipType
  ) {
    this.id = Symbol(`USS ${this._type} ${this._id}`);
  }

  public hit(): ShipDamage {
    this._hitCount++;
    if (this._hitCount >= this.size) {
      return ShipDamage.DESTROYED;
    }
    return ShipDamage.HIT;
  }
}
