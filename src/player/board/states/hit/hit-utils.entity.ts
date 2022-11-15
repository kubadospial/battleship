import { ShipType } from '../../../../utils';
import { Ship } from '../../ships/ship.entity';

export class HitUtils {
  constructor(private _grid: Map<string, Array<string | Symbol>>) {}

  findShip(ships: Map<number, Ship>, shipId: Symbol): Ship | undefined {
    return Array.from(ships.values()).find((ship) => ship.id === shipId);
  }

  getShipId(columnId: string, rowNumber: number): string | Symbol | undefined {
    const col = this._grid.get(columnId);
    if (col) {
      return col[rowNumber - 1];
    }
    return undefined;
  }

  shipType(shipId: Symbol): ShipType | undefined {
    if (this.isDestroyer(shipId)) {
      return ShipType.DESTROYER;
    } else if (this.isBattleship(shipId)) {
      return ShipType.BATTLESHIP;
    }
  }

  isDestroyer(shipId: Symbol): boolean {
    return this._isShip(ShipType.DESTROYER, shipId);
  }

  isBattleship(shipId: Symbol): boolean {
    return this._isShip(ShipType.BATTLESHIP, shipId);
  }

  private _isShip(shipType: ShipType, shipId: Symbol): boolean {
    return shipId.toString().includes(shipType);
  }
}
