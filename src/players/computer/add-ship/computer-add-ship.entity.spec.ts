import { ShipOrientation } from '../../../utils';
import { computerGridStub } from '../grid/computer-grid.stub';
import { ComputerAddShip } from './computer-add-ship.entity';

describe('ComputerAddShip', () => {
  let addShip: ComputerAddShip;

  let grid: Map<string, Array<string | Symbol>>;

  beforeEach(() => {
    grid = computerGridStub();
    addShip = new ComputerAddShip(grid);
  });

  it('adds a destroyer horizontally to the grid', () => {
    addShip.addShipToGrid(4, ShipOrientation.HORIZONTAL, 'A', 1);
    const getShip = (col: string) => grid.get(col)![0];

    expect(!!getShip('A')).toEqual(true);
    expect(!!getShip('B')).toEqual(true);
    expect(!!getShip('C')).toEqual(true);
    expect(!!getShip('D')).toEqual(true);
    expect(!!getShip('E')).toEqual(false);
  });

  it('adds a destroyer vertically to the grid', () => {
    addShip.addShipToGrid(4, ShipOrientation.VERTICAL, 'A', 1);
    const getShip = (row: number) => grid.get('A')![row];

    expect(!!getShip(0)).toEqual(true);
    expect(!!getShip(1)).toEqual(true);
    expect(!!getShip(2)).toEqual(true);
    expect(!!getShip(3)).toEqual(true);
    expect(!!getShip(4)).toEqual(false);
  });

  it('adds a battleship horizontally to the grid', () => {
    addShip.addShipToGrid(5, ShipOrientation.HORIZONTAL, 'A', 1);
    const getShip = (col: string) => grid.get(col)![0];

    expect(!!getShip('A')).toEqual(true);
    expect(!!getShip('B')).toEqual(true);
    expect(!!getShip('C')).toEqual(true);
    expect(!!getShip('D')).toEqual(true);
    expect(!!getShip('E')).toEqual(true);
    expect(!!getShip('F')).toEqual(false);
  });

  it('adds a battleship vertically to the grid', () => {
    addShip.addShipToGrid(5, ShipOrientation.VERTICAL, 'A', 1);
    const getShip = (row: number) => grid.get('A')![row];

    expect(!!getShip(0)).toEqual(true);
    expect(!!getShip(1)).toEqual(true);
    expect(!!getShip(2)).toEqual(true);
    expect(!!getShip(3)).toEqual(true);
    expect(!!getShip(4)).toEqual(true);
    expect(!!getShip(5)).toEqual(false);
  });

  it('detect when ship is too close vertically to the border', () => {
    const shipSize = 5;

    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.VERTICAL, 'A', 10)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.VERTICAL, 'A', 9)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.VERTICAL, 'A', 8)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.VERTICAL, 'A', 7)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.VERTICAL, 'A', 6)
    ).toBeTruthy();
  });

  it('detect when ship is too close horizontally to the border', () => {
    const shipSize = 5;

    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.HORIZONTAL, 'J', 1)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.HORIZONTAL, 'I', 1)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.HORIZONTAL, 'H', 1)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.HORIZONTAL, 'G', 1)
    ).toBeFalsy();
    expect(
      addShip.addShipToGrid(shipSize, ShipOrientation.HORIZONTAL, 'F', 1)
    ).toBeTruthy();
  });
});
