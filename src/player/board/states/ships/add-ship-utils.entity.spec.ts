import { ShipOrientation } from '../../../../utils';
import { gridStub } from '../../grid/grid.stub';
import { Battleship } from '../../ships/battleship.entity';
import { Destroyer } from '../../ships/destroyer.entity';
import { AddShipUtils } from './add-ship-utils.entity';

describe('AddShipUtils', () => {
  let util: AddShipUtils;
  let grid: Map<string, Array<string | Symbol>>;

  beforeEach(() => {
    grid = gridStub();
    util = new AddShipUtils(grid);
  });

  it('adds a destroyer horizontally to the grid', () => {
    const ship = new Destroyer('test');

    util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'A', 1);
    const getShip = (col: string) => grid.get(col)![0];

    expect(getShip('A')).toEqual(ship.id);
    expect(getShip('B')).toEqual(ship.id);
    expect(getShip('C')).toEqual(ship.id);
    expect(getShip('D')).toEqual(ship.id);
    expect(getShip('E')).toEqual('');
  });

  it('adds a destroyer vertically to the grid', () => {
    const ship = new Destroyer('test');

    util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 1);
    const getShip = (row: number) => grid.get('A')![row];

    expect(getShip(0)).toEqual(ship.id);
    expect(getShip(1)).toEqual(ship.id);
    expect(getShip(2)).toEqual(ship.id);
    expect(getShip(3)).toEqual(ship.id);
    expect(getShip(4)).toEqual('');
  });

  it('adds a battleship horizontally to the grid', () => {
    const ship = new Battleship('test');

    util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'A', 1);
    const getShip = (col: string) => grid.get(col)![0];

    expect(getShip('A')).toEqual(ship.id);
    expect(getShip('B')).toEqual(ship.id);
    expect(getShip('C')).toEqual(ship.id);
    expect(getShip('D')).toEqual(ship.id);
    expect(getShip('E')).toEqual(ship.id);
    expect(getShip('F')).toEqual('');
  });

  it('adds a battleship vertically to the grid', () => {
    const ship = new Battleship('test');

    util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 1);
    const getShip = (row: number) => grid.get('A')![row];

    expect(getShip(0)).toEqual(ship.id);
    expect(getShip(1)).toEqual(ship.id);
    expect(getShip(2)).toEqual(ship.id);
    expect(getShip(3)).toEqual(ship.id);
    expect(getShip(4)).toEqual(ship.id);
    expect(getShip(5)).toEqual('');
  });

  it('detect when ship is too close vertically to the border', () => {
    const ship = new Battleship('test');

    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 10)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 9)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 8)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 7)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.VERTICAL, 'A', 6)
    ).not.toThrowError();
  });

  it('detect when ship is too close horizontally to the border', () => {
    const ship = new Battleship('test');

    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'J', 1)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'I', 1)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'H', 1)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'G', 1)
    ).toThrowError();
    expect(() =>
      util.addShipToGrid(ship, ShipOrientation.HORIZONTAL, 'F', 1)
    ).not.toThrowError();
  });
});
