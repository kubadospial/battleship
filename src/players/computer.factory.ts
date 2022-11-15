import { GameState } from '../game-state/game.state';
import { Player } from '../player/player.factory';
import { GamePhase, Players } from '../utils';
import { ComputerShipsState } from './computer/state/computer-ships.state';
import { ComputerHitState } from './computer/state/computer-hit.state';

export class Computer {
  private _shipState: ComputerShipsState;
  private _hitState: ComputerHitState;

  constructor(private _player: Player, private _state: GameState) {
    this._hitState = new ComputerHitState(this._state);
    this._shipState = new ComputerShipsState(this._player);

    this._runTurn();
    this._state.hitSubscribe(
      Players.COMPUTER,
      (row: number, column: string) => {
        const hitMsg = this._player.hit(row, column);
        if (hitMsg != null) {
          this._runTurn();
        }
      }
    );
  }

  private _runTurn() {
    switch (this._state.getGamePhase(Players.COMPUTER)) {
      case GamePhase.INIT:
        this._shipState.addBattleShip();
        this._shipState.addDestroyer();
        break;
      case GamePhase.IN_PROGRESS:
        this._hitState.hit();
        const isWin =
          this._state.getGamePhase(Players.COMPUTER) === GamePhase.WIN;

        if (isWin) {
          this._runTurn();
        }
        break;
      case GamePhase.WIN:
        this._player.checkWin();
        break;
    }
  }
}
