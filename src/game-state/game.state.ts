import {
  BATTELSHIP_NUMBER,
  DESTROYERS_NUMBER,
  GamePhase,
  Players,
} from '../utils';
import { PhaseDetector } from './phase-detector/phase-detector.entity';
import { HitEmitter } from './hit-emitter/hit-emitter.entity';

export class GameState {
  private _phases: Map<Players, GamePhase> = new Map([
    [Players.PLAYER, GamePhase.INIT],
    [Players.COMPUTER, GamePhase.INIT],
  ]);
  private _phaseDetector = new PhaseDetector();
  private _hitEmitter = new HitEmitter();

  hitSubscribe(player: Players, cb: (row: number, column: string) => void) {
    this._hitEmitter.subscibe(player, cb);
  }

  hitEmit(
    player: Players,
    value: {
      column: string;
      row: number;
    }
  ) {
    this._hitEmitter.emit(player, value);
  }

  getGamePhase(player: Players) {
    return this._phaseDetector.getGamePhase(player, this._phases);
  }

  getPlayerPhase(player: Players): GamePhase {
    return this._phases.get(player)!;
  }

  setInProgress(player: Players) {
    this._phases.set(player, GamePhase.IN_PROGRESS);
  }

  setLose(player: Players) {
    this._phases.set(player, GamePhase.LOSE);
  }

  isInProgress(destroyersPlaced: number, battleshipsPlaced: number): boolean {
    return (
      battleshipsPlaced >= BATTELSHIP_NUMBER &&
      destroyersPlaced >= DESTROYERS_NUMBER
    );
  }

  isLose(battleShipSunk: number, destroyerSunk: number): boolean {
    return (
      battleShipSunk >= BATTELSHIP_NUMBER && destroyerSunk >= DESTROYERS_NUMBER
    );
  }
}
