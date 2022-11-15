import { Board } from './board/board.aggregator';
import {
  GamePhase,
  MESSAGE,
  Players,
  ShipDamage,
  ShipOrientation,
  ShipType,
} from '../utils';
import { youWin } from '../ui/controls';
import { GameState } from '../game-state/game.state';

export class Player {
  private _board = new Board();

  constructor(private _state: GameState, private _player: Players) {}

  public checkWin = () => {
    switch (this._state.getGamePhase(this._player)) {
      case GamePhase.WIN:
        console.clear();
        youWin(this._player);
        this._msg(`${this._player} wins`);
        break;
    }
  };

  public addShip(
    row: number,
    column: string,
    orientation: ShipOrientation,
    shipType: ShipType
  ) {
    if (this._state.getGamePhase(this._player) === GamePhase.INIT) {
      this._board.placeShipOnGrid(orientation, shipType, row, column);

      const { destroyers, battleships } = this._board.placedShips;
      this._msg(
        `battleships placed: ${battleships}, destroyers placed: ${destroyers}`
      );

      this._changeInitToInProgress(destroyers, battleships);
    }
  }

  public hit(row: number, column: string): ShipDamage | undefined {
    const hitMsg = this._board.hit(row, column);
    if (hitMsg) {
      this._msg(hitMsg);
      const { battleships, destroyers } = this._board.sunkShips;
      this._msg(
        `battleship sunk: ${battleships}, destroyers sunk: ${destroyers}`
      );
      this._changeInProgressToLose();
    }
    return hitMsg;
  }

  private _changeInitToInProgress(destroyers: number, battleships: number) {
    const isInProgress = this._state.isInProgress(destroyers, battleships);
    if (isInProgress) {
      this._state.setInProgress(this._player);
    }
  }

  private _changeInProgressToLose() {
    const { battleships, destroyers } = this._board.sunkShips;
    const isLosePhase = this._state.isLose(battleships, destroyers);
    if (isLosePhase) {
      this._state.setLose(this._player);
      this.checkWin();
    }
  }

  private _msg(msg: string) {
    MESSAGE(msg, this._player);
  }
}
