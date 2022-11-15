export const enum GamePhase {
  INIT = 'init',
  IN_PROGRESS = 'in-progress',
  WIN = 'win',
  LOSE = 'lose',
}

export const enum ShipDamage {
  HIT = 'hit',
  DESTROYED = 'destroyed',
  MISS = 'miss',
}

export const BATTELSHIP_NUMBER = 1;
export const DESTROYERS_NUMBER = 2;
export const GRID_SIZE = 10;

export const ROW_HEADERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const BATTLESHIP_LENGTH = 5;
export const DESTROYERS_LENGTH = 4;

export const enum ShipOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export const enum ShipType {
  DESTROYER = 'destroyer',
  BATTLESHIP = 'battleship',
}

export const enum Players {
  PLAYER = 'player',
  COMPUTER = 'computer',
}

export const MESSAGE = (message: string, player: Players) => {
  const bg = player === Players.PLAYER ? 'yellow' : 'red';
  const color = player === Players.PLAYER ? 'green' : 'white';
  console.log(
    `%c${player}: ${message}`,
    `color: ${color}; background: ${bg}; font-size: 16px`
  );
};
