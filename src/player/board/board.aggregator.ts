import { Grid } from './grid/grid.vo';
import { Battleship } from './ships/battleship.entity';
import { Destroyer } from './ships/destroyer.entity';
import {
  BATTELSHIP_NUMBER,
  DESTROYERS_NUMBER,
  GRID_SIZE,
  ShipDamage,
} from '../../utils';
import { ShipOrientation, ShipType } from '../../utils';
import { HitState } from './states/hit/hit.state';
import { ShipsState } from './states/ships/ships.state';

export class Board {
  private readonly _grid = Grid.generate(GRID_SIZE, GRID_SIZE);
  private readonly _battleships: Map<number, Battleship>;
  private readonly _destroyers: Map<number, Destroyer>;
  private readonly _shipsState: ShipsState;
  private readonly _hitState: HitState;
  private readonly _hitLog = new Set<string>();

  constructor() {
    this._battleships = new Map<number, Battleship>();
    this._destroyers = new Map<number, Destroyer>();
    this._createBattleships(BATTELSHIP_NUMBER);
    this._createDestroyers(DESTROYERS_NUMBER);
    this._shipsState = new ShipsState(
      this._grid,
      this._battleships,
      this._destroyers
    );
    this._hitState = new HitState(
      this._grid,
      this._battleships,
      this._destroyers
    );
  }

  public get placedShips(): {
    battleships: number;
    destroyers: number;
  } {
    const { battleshipsPlaced, destroyersPlaced } = this._shipsState;
    return { battleships: battleshipsPlaced, destroyers: destroyersPlaced };
  }

  public get sunkShips(): {
    battleships: number;
    destroyers: number;
  } {
    const { battleShipsSunk, destroyersSunk } = this._hitState;
    return { battleships: battleShipsSunk, destroyers: destroyersSunk };
  }

  public hit(rowNumber: number, columnId: string): ShipDamage | undefined {
    if (this._hitLog.has(rowNumber + columnId)) {
      console.warn('You already hit this target');
      return;
    }
    this._hitLog.add(rowNumber + columnId);
    return this._hitState.hit(rowNumber, columnId);
  }

  public placeShipOnGrid(
    or: ShipOrientation,
    type: ShipType,
    row: number,
    col: string
  ): void {
    switch (type) {
      case ShipType.BATTLESHIP:
        this._shipsState.placeBattleship(or, col, row);
        break;

      case ShipType.DESTROYER:
        this._shipsState.placeDestroyer(or, col, row);
        break;
    }
  }

  private _createBattleships(numOfShips: number): void {
    for (let i = 0; i < numOfShips; i++) {
      this._battleships.set(i, new Battleship('battleship ' + i));
    }
  }

  private _createDestroyers(numOfShips: number): void {
    for (let i = 0; i < numOfShips; i++) {
      this._destroyers.set(i, new Destroyer('destroyer ' + i));
    }
  }
}
