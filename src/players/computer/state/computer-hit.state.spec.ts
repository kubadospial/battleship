import { GameState } from '../../../game-state/game.state';
import { Players } from '../../../utils';
import { ComputerHitState } from './computer-hit.state';

describe('ComputerHitState', () => {
  const getColRowId = (hitReg: Map<string, (string | Symbol)[]>) => {
    const entries = Array.from(hitReg.entries());
    const row = entries.find(([_, value]) =>
      (value as (string | symbol)[]).some((v) => typeof v !== 'string')
    );
    const column = row?.[0];
    const rowNum = (row?.[1] as string[])?.findIndex(
      (v) => typeof v !== 'string'
    );
    return { column, rowNum };
  };

  it('registers it shots', () => {
    const game = new GameState();
    const state = new ComputerHitState(game);
    expect(getColRowId(state['_hitRegistry'])).toMatchObject({
      column: undefined,
      rowNum: undefined,
    });

    state.hit();

    const { column, rowNum } = getColRowId(state['_hitRegistry']);
    expect(column && rowNum).toBeTruthy();
  });

  it('calls hitEmit method', () => {
    const game = new GameState();
    const state = new ComputerHitState(game);
    const spy = jest.spyOn(state['_state'], 'hitEmit');
    state.hit();

    const hitReg = state['_hitRegistry'];
    const { column, rowNum } = getColRowId(hitReg);

    expect(spy).toHaveBeenCalledWith(Players.PLAYER, { column, row: rowNum });
  });
});
