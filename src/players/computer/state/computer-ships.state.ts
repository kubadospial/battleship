import { Player } from '../../../player/player.factory';
import {
  BATTELSHIP_NUMBER,
  BATTLESHIP_LENGTH,
  DESTROYERS_LENGTH,
  DESTROYERS_NUMBER,
  GRID_SIZE,
  ShipOrientation,
  ShipType,
} from '../../../utils';
import { ComputerAddShip } from '../add-ship/computer-add-ship.entity';
import { CoordinatesGenerator } from '../utils';
import { ComputerGrid } from '../grid/computer-grid.vo';

export class ComputerShipsState {
  private _battleshipsPlaced = 0;
  private _destroyersPlaced = 0;
  private _grid = ComputerGrid.generate(GRID_SIZE, GRID_SIZE);
  private _computerAddShip = new ComputerAddShip(this._grid);

  get battleshipsPlaced(): number {
    return this._battleshipsPlaced;
  }

  get destroyersPlaced(): number {
    return this._destroyersPlaced;
  }

  constructor(private _player: Player) {}

  addBattleShip() {
    if (this.battleshipsPlaced < BATTELSHIP_NUMBER) {
      const { row, col, orientation } =
        CoordinatesGenerator.generate(BATTLESHIP_LENGTH);
      const canAdd = this._canAddBattleship(orientation, col, row);

      if (canAdd) {
        this._player.addShip(row, col, orientation, ShipType.BATTLESHIP);
      }
      this.addBattleShip();
    }
  }

  addDestroyer() {
    if (this.destroyersPlaced < DESTROYERS_NUMBER) {
      const { row, col, orientation } =
        CoordinatesGenerator.generate(DESTROYERS_LENGTH);
      const canAdd = this._canAddDestroyer(orientation, col, row);

      if (canAdd) {
        this._player.addShip(row, col, orientation, ShipType.DESTROYER);
      }
      this.addDestroyer();
    }
  }

  private _canAddBattleship(
    or: ShipOrientation,
    col: string,
    row: number
  ): boolean {
    const size = BATTLESHIP_LENGTH;
    const ship = this._computerAddShip.addShipToGrid(size, or, col, row);
    if (!!ship) {
      this._battleshipsPlaced++;
    }
    return ship;
  }

  private _canAddDestroyer(
    or: ShipOrientation,
    col: string,
    row: number
  ): boolean {
    const size = DESTROYERS_LENGTH;
    const ship = this._computerAddShip.addShipToGrid(size, or, col, row);
    if (!!ship) {
      this._destroyersPlaced++;
    }
    return ship;
  }
}
