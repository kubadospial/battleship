export class CollisionDetector {
  constructor(private _grid: Map<string, Array<string | Symbol>>) {}

  vertical(
    column: Array<string | Symbol>,
    rowNumber: number,
    size: number
  ): boolean {
    return [...column]
      .splice(rowNumber - 1, size)
      .some((el: string | Symbol) => typeof el !== 'string');
  }

  horizontal(headers: string[], rowNumber: number): boolean {
    const rows = headers.map((header) => {
      const row = this._grid.get(header);
      return row ? row![rowNumber - 1] : header;
    });
    return rows.some((el: string | Symbol) => typeof el !== 'string');
  }
}
