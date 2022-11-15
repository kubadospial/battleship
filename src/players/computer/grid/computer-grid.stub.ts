import { GRID_SIZE } from '../../../utils';
import { ComputerGrid } from './computer-grid.vo';

export const computerGridStub = () =>
  ComputerGrid.generate(GRID_SIZE, GRID_SIZE);
