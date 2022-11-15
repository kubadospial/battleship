import { GameState } from '../../../game-state/game.state';
import { GRID_SIZE, Players } from '../../../utils';
import { CoordinatesGenerator } from '../utils';
import { ComputerGrid } from '../grid/computer-grid.vo';

export class ComputerHitState {
  private _hitRegistry = ComputerGrid.generate(GRID_SIZE, GRID_SIZE);

  constructor(private _state: GameState) {}

  hit() {
    const { row, col } = CoordinatesGenerator.generate();
    const currentCol = this._hitRegistry.get(col);
    if (!!currentCol && !!currentCol[row]) {
      this.hit();
      return;
    }
    this._registerHit(currentCol, row, col);
    this._state.hitEmit(Players.PLAYER, { column: col, row });
  }

  private _registerHit(
    currentCol: (string | Symbol)[] | undefined,
    row: number,
    col: string
  ): void {
    const newCol = [...(currentCol ?? [])];
    newCol[row] = Symbol();
    this._hitRegistry.set(col, newCol);
  }
}
