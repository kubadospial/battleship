import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import { ShipDamage, ShipType } from '../../../../utils';
import { HitUtils } from './hit-utils.entity';
import { Ship } from '../../ships/ship.entity';

export class HitState {
  private _hitUtils: HitUtils;
  public battleShipsSunk = 0;
  public destroyersSunk = 0;

  constructor(
    private _grid: Map<string, Array<string | Symbol>>,
    private _battleships: Map<number, Battleship>,
    private _destroyers: Map<number, Destroyer>
  ) {
    this._hitUtils = new HitUtils(this._grid);
  }

  public hit(rowNumber: number, columnId: string): ShipDamage {
    if (columnId) {
      const shipId = this._hitUtils.getShipId(columnId, rowNumber);
      if (!shipId) {
        return ShipDamage.MISS;
      }
      let ship = this._asignShip(shipId);
      if (ship) {
        const msg = ship.hit();
        this._manageDestroyState(shipId, msg);
        return msg;
      }
    }
    return ShipDamage.MISS;
  }

  private _manageDestroyState(
    shipId: string | Symbol,
    message: ShipDamage
  ): void {
    if (typeof shipId !== 'string' && message === ShipDamage.DESTROYED) {
      const shipType = this._hitUtils.shipType(shipId)!;
      if (shipType === ShipType.BATTLESHIP) {
        this.battleShipsSunk++;
      } else if (shipType === ShipType.DESTROYER) {
        this.destroyersSunk++;
      }
    }
  }

  private _asignShip(id: string | Symbol): Ship | undefined {
    if (typeof id !== 'string' && this._hitUtils.isBattleship(id)) {
      return this._hitUtils.findShip(this._battleships, id);
    } else if (typeof id !== 'string' && this._hitUtils.isDestroyer(id)) {
      return this._hitUtils.findShip(this._destroyers, id);
    }
  }
}
