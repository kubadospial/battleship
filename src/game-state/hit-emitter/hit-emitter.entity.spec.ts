import { Players } from '../../utils';
import { HitEmitter } from './hit-emitter.entity';

describe('HitEmitter', () => {
  let emitter: HitEmitter;

  beforeEach(() => {
    emitter = new HitEmitter();
  });

  it('subscribs when emitted', () => {
    const fn = (row: number, column: string) => {};
    emitter.subscibe(Players.COMPUTER, fn);
    const spy = jest.spyOn(fn as any, 'call');

    emitter.emit(Players.COMPUTER, { column: 'A', row: 1 });
    expect(spy).toHaveBeenCalled();
  });
});
