export class ComputerCollisionDetector {
  constructor(private _grid: Map<string, Array<string | Symbol>>) {}

  horizontal(headers: string[], rowNumber: number): boolean {
    const rows = headers.map(
      (header) => this._grid.get(header)![rowNumber - 1]
    );
    return rows.some((el: string | Symbol) => typeof el !== 'string');
  }

  vertical(
    column: Array<string | Symbol>,
    rowNumber: number,
    size: number
  ): boolean {
    return [...column]
      .splice(rowNumber - 1, size)
      .some((el: string | Symbol) => typeof el !== 'string');
  }
}
