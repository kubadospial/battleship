import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import {
  BATTELSHIP_NUMBER,
  DESTROYERS_NUMBER,
  ShipOrientation,
} from '../../../../utils';
import { AddShipUtils } from './add-ship-utils.entity';

export class ShipsState {
  private _battleshipsPlaced = 0;
  private _destroyersPlaced = 0;

  private _addShipUtils: AddShipUtils;

  constructor(
    private _grid: Map<string, Array<string | Symbol>>,
    private _battleships: Map<number, Battleship>,
    private _destroyers: Map<number, Destroyer>
  ) {
    this._addShipUtils = new AddShipUtils(this._grid);
  }

  get battleshipsPlaced(): number {
    return this._battleshipsPlaced;
  }

  get destroyersPlaced(): number {
    return this._destroyersPlaced;
  }

  placeBattleship(
    orientation: ShipOrientation,
    columnId: string,
    rowNumber: number
  ): void {
    if (this._battleshipsPlaced >= BATTELSHIP_NUMBER) {
      console.warn('Cannot add more battleships');
      return;
    }
    const ship = this._battleships.get(this._battleshipsPlaced);
    if (ship) {
      try {
        this._addShipUtils.addShipToGrid(
          ship,
          orientation,
          columnId,
          rowNumber
        );
        this._battleshipsPlaced++;
      } catch (error) {
        console.error(error);
      }
    }
  }

  placeDestroyer(
    orientation: ShipOrientation,
    columnId: string,
    rowNumber: number
  ): void {
    if (this._destroyersPlaced >= DESTROYERS_NUMBER) {
      console.warn('Cannot add more destroyers');
      return;
    }
    const ship = this._destroyers.get(this._destroyersPlaced);
    if (ship) {
      try {
        this._addShipUtils.addShipToGrid(
          ship,
          orientation,
          columnId,
          rowNumber
        );
        this._destroyersPlaced++;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
