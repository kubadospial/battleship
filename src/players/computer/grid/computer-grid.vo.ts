import { ROW_HEADERS } from '../../../utils';

export class ComputerGrid {
  private _grid: Map<string, Array<Symbol | string>>;

  static generate(
    rowNum: number,
    colNum: number
  ): Map<string, Array<Symbol | string>> {
    return new ComputerGrid(rowNum, colNum)._grid;
  }

  constructor(private _rowNum: number, private _colNum: number) {
    this._grid = new Map<string, Array<Symbol | string>>();
    this._createColumns(this._colNum);
  }

  private _createColumns(colNum: number) {
    for (let i = 0; i < colNum; i++) {
      this._grid.set(ROW_HEADERS[i], this._createRows(this._rowNum));
    }
  }

  private _createRows(rowNum: number): string[] | Symbol[] {
    return new Array(rowNum).fill('');
  }
}
