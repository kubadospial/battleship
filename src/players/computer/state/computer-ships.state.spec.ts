import {
  BATTELSHIP_NUMBER,
  DESTROYERS_NUMBER,
  ShipOrientation,
  ShipType,
} from '../../../utils';
import { ComputerShipsState } from './computer-ships.state';

describe('ComputerShipsState', () => {
  let state: ComputerShipsState;

  beforeEach(() => {
    const mock = {
      addShip: (
        row: number,
        column: string,
        orientation: ShipOrientation,
        shipType: ShipType
      ) => {},
    } as any;
    state = new ComputerShipsState(mock);
  });

  it('adds battleship', () => {
    expect(state.battleshipsPlaced).toEqual(0);
    expect(state.destroyersPlaced).toEqual(0);

    state.addBattleShip();

    expect(state.battleshipsPlaced).toEqual(BATTELSHIP_NUMBER);
    expect(state.destroyersPlaced).toEqual(0);
  });

  it('adds destroyer', () => {
    expect(state.battleshipsPlaced).toEqual(0);
    expect(state.destroyersPlaced).toEqual(0);

    state.addDestroyer();

    expect(state.battleshipsPlaced).toEqual(0);
    expect(state.destroyersPlaced).toEqual(DESTROYERS_NUMBER);
  });
});
