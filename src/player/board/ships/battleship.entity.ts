import { BATTLESHIP_LENGTH, ShipType } from '../../../utils';
import { Ship } from './ship.entity';

export class Battleship extends Ship {
  constructor(protected name: string) {
    super(name, BATTLESHIP_LENGTH, ShipType.BATTLESHIP);
  }
}
