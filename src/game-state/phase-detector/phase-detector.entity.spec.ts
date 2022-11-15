import { GamePhase, Players } from '../../utils';
import { PhaseDetector } from './phase-detector.entity';

describe('PhaseDetector', () => {
  let detector: PhaseDetector;

  const gamePhaseEmu = (
    hoomanPhase = GamePhase.INIT,
    computerPhase = GamePhase.INIT
  ) =>
    new Map([
      [Players.PLAYER, hoomanPhase],
      [Players.COMPUTER, computerPhase],
    ]);

  beforeEach(() => {
    detector = new PhaseDetector();
  });

  it('detects init phase', () => {
    const phases = gamePhaseEmu();
    expect(detector.getGamePhase(Players.COMPUTER, phases)).toEqual(
      GamePhase.INIT
    );
    expect(detector.getGamePhase(Players.PLAYER, phases)).toEqual(
      GamePhase.INIT
    );
  });

  it('returns init until all players are in-progress', () => {
    const phases = gamePhaseEmu(undefined, GamePhase.IN_PROGRESS);
    expect(detector.getGamePhase(Players.COMPUTER, phases)).toEqual(
      GamePhase.INIT
    );
    expect(detector.getGamePhase(Players.PLAYER, phases)).toEqual(
      GamePhase.INIT
    );

    const phasesInProgress = gamePhaseEmu(
      GamePhase.IN_PROGRESS,
      GamePhase.IN_PROGRESS
    );
    expect(detector.getGamePhase(Players.COMPUTER, phasesInProgress)).toEqual(
      GamePhase.IN_PROGRESS
    );
    expect(detector.getGamePhase(Players.PLAYER, phasesInProgress)).toEqual(
      GamePhase.IN_PROGRESS
    );
  });

  it('returns win for player when computer loses', () => {
    const phases = gamePhaseEmu(undefined, GamePhase.LOSE);
    expect(detector.getGamePhase(Players.COMPUTER, phases)).toEqual(
      GamePhase.LOSE
    );
    expect(detector.getGamePhase(Players.PLAYER, phases)).toEqual(
      GamePhase.WIN
    );
  });

  it('returns lose for player when computer wins', () => {
    const phases = gamePhaseEmu(GamePhase.LOSE);
    expect(detector.getGamePhase(Players.COMPUTER, phases)).toEqual(
      GamePhase.WIN
    );
    expect(detector.getGamePhase(Players.PLAYER, phases)).toEqual(
      GamePhase.LOSE
    );
  });
});
