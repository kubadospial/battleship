import { Players } from '../../utils';

type CallbackValue = {
  column: string;
  row: number;
};

type EmitFn = (row: number, column: string) => void;

export class HitEmitter {
  private _registry = new Map<Players, EmitFn>();

  subscibe(player: Players, val: EmitFn) {
    this._registry.set(player, val);
  }

  emit(name: Players, value: CallbackValue) {
    const cb = this._registry.get(name);
    if (cb) {
      cb.call(null, value.row, value.column);
    }
  }
}
