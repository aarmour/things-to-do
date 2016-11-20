import { SetMap } from '../set-map';

export abstract class ControlComponent implements SetMap {

  protected map: any;

  abstract afterSetMap(): void

  setMap(value: any) {
    if (this.map) return;
    this.map = value;
    this.afterSetMap();
  }

}
