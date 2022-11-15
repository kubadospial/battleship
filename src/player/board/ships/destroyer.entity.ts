import { DESTROYERS_LENGTH, ShipType } from '../../../utils';
import { Ship } from './ship.entity';

export class Destroyer extends Ship {
  constructor(protected name: string) {
    super(name, DESTROYERS_LENGTH, ShipType.DESTROYER);
  }
}
