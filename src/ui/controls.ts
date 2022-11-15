import { ShipOrientation, ShipType } from '../utils';

const getElement = (name: string) => document.querySelector(name);

const getColumnValue = () =>
  (getElement('#column-select') as HTMLSelectElement)?.value;

const getRowValue = () =>
  (getElement('#row-select') as HTMLSelectElement)?.value;

const getShipTypeValue = () =>
  (getElement('#shiptype-select') as HTMLSelectElement)?.value;

const getOrientationValue = () =>
  (getElement('#orientation-select') as HTMLSelectElement)?.value;

export const getInputValues = (): {
  column: string;
  row: number;
  shipType: ShipType;
  orientation: ShipOrientation;
} => ({
  column: getColumnValue(),
  row: Number(getRowValue()),
  shipType: getShipTypeValue() as ShipType,
  orientation: getOrientationValue() as ShipOrientation,
});

export const removeShipTypeEl = () => getElement('#shiptype-select')?.remove();

export const removeOrientationEl = () =>
  getElement('#orientation-select')?.remove();

export const listenToButton = (cb: () => void) =>
  getElement('#submit')?.addEventListener('click', cb);

export const changeButtonText = (text: string) =>
  ((getElement('#submit') as HTMLButtonElement).innerHTML = text);

export const youWin = (player: string) =>
  ((getElement('.app') as HTMLElement).innerText = `${player} wins`);
