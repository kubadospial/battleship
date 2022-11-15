import { GRID_SIZE, ROW_HEADERS, ShipOrientation } from '../../utils';

export class CoordinatesGenerator {
  public static generate(shipLength?: number) {
    const orientation = this._randomOrientation();
    const colOffset = this._colOffset(orientation, shipLength);
    const rowOffset = this._rowOffset(orientation, shipLength);

    return {
      orientation,
      col: this._randomCol(colOffset),
      row: this._randomRow(rowOffset),
    };
  }

  private static _colOffset(
    orientation: ShipOrientation,
    shipLength: number | undefined
  ): number {
    if (shipLength != null) {
      return orientation === ShipOrientation.VERTICAL ? shipLength + 1 : 0;
    }
    return 0;
  }

  private static _rowOffset(
    orientation: ShipOrientation,
    shipLength: number | undefined
  ): number {
    if (shipLength != null) {
      return orientation === ShipOrientation.HORIZONTAL ? shipLength + 1 : 0;
    }
    return 0;
  }

  private static _randomOrientation() {
    if (!!Math.round(Math.random())) {
      return ShipOrientation.HORIZONTAL;
    }
    return ShipOrientation.VERTICAL;
  }

  private static _randomCol(offset: number): string {
    return ROW_HEADERS[this._randomNumber(offset)];
  }

  private static _randomRow(offset: number): number {
    return this._randomNumber(offset);
  }

  private static _randomNumber(offset: number) {
    return Math.ceil(Math.random() * (GRID_SIZE - offset));
  }
}
