import { GRID_SIZE } from '../../../utils';
import { Grid } from './grid.vo';

export const gridStub = () => Grid.generate(GRID_SIZE, GRID_SIZE);
