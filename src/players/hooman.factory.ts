import { GameState } from '../game-state/game.state';
import { Player } from '../player/player.factory';
import {
  changeButtonText,
  getInputValues,
  listenToButton,
  removeOrientationEl,
  removeShipTypeEl,
} from '../ui/controls';
import { GamePhase, MESSAGE, Players } from '../utils';

export class Hooman {
  constructor(private _player: Player, private _state: GameState) {
    listenToButton(this._runTurn);
    this._state.hitSubscribe(Players.PLAYER, (row: number, col: string) =>
      this._player.hit(row, col)
    );
  }

  private _runTurn = () => {
    this._player.checkWin();
    const { row, column, orientation, shipType } = getInputValues();
    const phase = this._state.getGamePhase(Players.PLAYER);

    switch (phase) {
      case GamePhase.INIT:
        this._player.addShip(row, column, orientation, shipType);
        const isInProgress =
          this._state.getPlayerPhase(Players.PLAYER) === GamePhase.IN_PROGRESS;
        if (isInProgress) {
          this.prepareForInProgress();
        }
        break;

      case GamePhase.IN_PROGRESS:
        this._state.hitEmit(Players.COMPUTER, { column, row });
        const isWin =
          this._state.getGamePhase(Players.PLAYER) === GamePhase.WIN;
        if (isWin) {
          this._runTurn();
        }
        break;
    }
  };

  prepareForInProgress = () => {
    console.clear();
    removeShipTypeEl();
    removeOrientationEl();
    changeButtonText('Drop bomb!');
    MESSAGE('Start Game!', Players.PLAYER);
  };
}
