import { Player } from './player/player.factory';
import { GameState } from './game-state/game.state';
import { Players } from './utils';
import { Hooman } from './players/hooman.factory';
import { Computer } from './players/computer.factory';

const state = new GameState();
const playerOne = new Player(state, Players.PLAYER);
const playerTwo = new Player(state, Players.COMPUTER);

new Computer(playerTwo, state);
new Hooman(playerOne, state);
