import {
  BATTELSHIP_NUMBER,
  DESTROYERS_NUMBER,
  GamePhase,
  Players,
} from '../utils';
import { GameState } from './game.state';

describe('GameState', () => {
  let state: GameState;

  beforeEach(() => {
    state = new GameState();
  });

  it('sets and returns phase per user', () => {
    state.setInProgress(Players.COMPUTER);
    expect(state.getPlayerPhase(Players.COMPUTER)).toEqual(
      GamePhase.IN_PROGRESS
    );
    expect(state.getPlayerPhase(Players.PLAYER)).toEqual(GamePhase.INIT);
  });

  it('sets lose game phase', () => {
    state.setLose(Players.COMPUTER);
    expect(state.getPlayerPhase(Players.COMPUTER)).toEqual(GamePhase.LOSE);
  });

  it('returns if its in-progress', () => {
    expect(
      state.isInProgress(DESTROYERS_NUMBER, BATTELSHIP_NUMBER)
    ).toBeTruthy();
    expect(
      state.isInProgress(DESTROYERS_NUMBER, DESTROYERS_NUMBER + 1)
    ).toBeTruthy();

    expect(state.isInProgress(DESTROYERS_NUMBER, 0)).toBeFalsy();
  });

  it('returns if its lose', () => {
    expect(state.isLose(BATTELSHIP_NUMBER, DESTROYERS_NUMBER)).toBeTruthy();
    expect(state.isLose(BATTELSHIP_NUMBER, DESTROYERS_NUMBER + 1)).toBeTruthy();

    expect(state.isLose(BATTELSHIP_NUMBER, 0)).toBeFalsy();
  });
});
