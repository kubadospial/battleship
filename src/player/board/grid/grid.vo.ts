import { ROW_HEADERS } from '../../../utils';

export class Grid {
  private _grid: Map<string, Array<string | Symbol>>;

  static generate(
    rowNum: number,
    colNum: number
  ): Map<string, Array<string | Symbol>> {
    return new Grid(rowNum, colNum)._grid;
  }

  constructor(private _rowNum: number, private _colNum: number) {
    if (_rowNum > 10 || _colNum > 10) {
      throw Error('Number of rows or columns cannot be greater than 10');
    }
    if (_rowNum <= 0 || _colNum <= 0) {
      throw Error('Number of rows or columns cannot be equa or lower than 0');
    }
    this._grid = new Map<string, string[]>();
    this._createColumns(this._colNum);
  }

  private _createColumns(colNum: number) {
    for (let i = 0; i < colNum; i++) {
      this._grid.set(ROW_HEADERS[i], this._createRows(this._rowNum));
    }
  }

  private _createRows(rowNum: number): string[] {
    return new Array(rowNum).fill('');
  }
}
