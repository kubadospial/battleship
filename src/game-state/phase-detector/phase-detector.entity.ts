import { GamePhase, Players } from '../../utils';

export class PhaseDetector {
  getGamePhase(player: Players, phases: Map<Players, GamePhase>): GamePhase {
    if (this._phasesValues(phases).every((p) => p === GamePhase.IN_PROGRESS)) {
      return GamePhase.IN_PROGRESS;
    }
    const playerWinLose = this._determinLoseWin(
      phases,
      player,
      Players.PLAYER,
      Players.COMPUTER
    );
    const computerWinLose = this._determinLoseWin(
      phases,
      player,
      Players.COMPUTER,
      Players.PLAYER
    );
    if (playerWinLose) {
      return playerWinLose;
    } else if (computerWinLose) {
      return computerWinLose;
    }

    return GamePhase.INIT;
  }

  private _phasesValues(phases: Map<Players, GamePhase>): GamePhase[] {
    return Array.from(phases.values());
  }

  private _determinLoseWin(
    phases: Map<Players, GamePhase>,
    actor: Players,
    playerOne: Players,
    playerTwo: Players
  ): GamePhase | undefined {
    if (actor === playerOne && phases.get(playerTwo) === GamePhase.LOSE) {
      return GamePhase.WIN;
    } else if (
      actor === playerTwo &&
      phases.get(playerTwo) === GamePhase.LOSE
    ) {
      return GamePhase.LOSE;
    }
    return undefined;
  }
}
