import { ROW_HEADERS, ShipOrientation } from '../../../../utils';
import { Ship } from '../../ships/ship.entity';
import { CollisionDetector } from './collision-detector.entity';

export class AddShipUtils {
  private _collisionDetector: CollisionDetector;

  constructor(private _grid: Map<string, Array<string | Symbol>>) {
    this._collisionDetector = new CollisionDetector(this._grid);
  }

  addShipToGrid(
    ship: Ship,
    orientation: ShipOrientation,
    columnId: string,
    rowNumber: number
  ): void {
    const { id, size } = ship;
    if (orientation === ShipOrientation.HORIZONTAL) {
      this._addHorizontal(columnId, rowNumber, size, id);
    } else if (orientation === ShipOrientation.VERTICAL) {
      this._addVertical(columnId, rowNumber, size, id);
    }
  }

  private _addHorizontal(
    columnId: string,
    rowNumber: number,
    size: number,
    id: Symbol
  ): void {
    const index = [...ROW_HEADERS].indexOf(columnId);
    const headers = [...ROW_HEADERS].splice(index, size);
    if (headers.length < size) {
      throw Error('Horizontal: Ship is placed too close to the edge');
    }
    if (this._collisionDetector.horizontal(headers, rowNumber)) {
      throw Error('Horizontal: Ship is colliding with other ship');
    }
    headers.forEach((header) => {
      const column = this._grid.get(header);
      if (column) {
        this._grid.set(
          header,
          column.map((v, i) => (i === rowNumber - 1 ? id : v))
        );
      }
    });
  }

  private _addVertical(
    columnId: string,
    rowNumber: number,
    size: number,
    id: Symbol
  ): void {
    const column = this._grid.get(columnId);
    if (column) {
      if (column.length - rowNumber + 1 < size) {
        throw Error('Vertical: Ship is placed too close to the edge');
      }
      if (this._collisionDetector.vertical(column, rowNumber, size)) {
        throw Error('Vertical: Ship is colliding with other ship');
      }
      const nCol = column.map((v: string | Symbol, i: number) =>
        i + 1 >= rowNumber && i < rowNumber + size - 1 ? id : v
      );
      this._grid.set(columnId, nCol);
    }
  }
}
