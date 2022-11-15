import { ROW_HEADERS, ShipOrientation } from '../../../utils';
import { ComputerCollisionDetector } from './collision-detector/computer-collision-detector.entity';

export class ComputerAddShip {
  private _collisionDetector: ComputerCollisionDetector;

  constructor(private _grid: Map<string, Array<string | Symbol>>) {
    this._collisionDetector = new ComputerCollisionDetector(this._grid);
  }

  addShipToGrid(
    size: number,
    orientation: ShipOrientation,
    columnId: string,
    rowNumber: number
  ): boolean {
    if (orientation === ShipOrientation.HORIZONTAL) {
      return this._addHorizontal(columnId, rowNumber, size);
    } else if (orientation === ShipOrientation.VERTICAL) {
      return this._addVertical(columnId, rowNumber, size);
    }
    return false;
  }

  private _addHorizontal(
    columnId: string,
    rowNumber: number,
    size: number
  ): boolean {
    const index = [...ROW_HEADERS].indexOf(columnId);
    const headers = [...ROW_HEADERS].splice(index, size);
    if (
      this._collisionDetector.horizontal(headers, rowNumber) ||
      headers.length < size
    ) {
      return false;
    }
    headers.forEach((header) => {
      const column = this._grid.get(header);
      if (column) {
        this._grid.set(
          header,
          column.map((v, i) => (i === rowNumber - 1 ? Symbol() : v))
        );
      }
    });
    return true;
  }

  private _addVertical(
    columnId: string,
    rowNumber: number,
    size: number
  ): boolean {
    const column = this._grid.get(columnId);
    if (column) {
      if (
        this._collisionDetector.vertical(column, rowNumber, size) ||
        column.length - rowNumber + 1 < size
      ) {
        return false;
      }
      const nCol = column.map((v: string | Symbol, i: number) =>
        i + 1 >= rowNumber && i < rowNumber + size - 1 ? Symbol() : v
      );
      this._grid.set(columnId, nCol);
      return true;
    }
    return false;
  }
}
