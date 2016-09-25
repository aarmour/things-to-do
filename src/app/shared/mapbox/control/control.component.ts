interface SetMapFunc {
  (map: any): void
}

export interface SetMap {
  setMap: SetMapFunc
}

export abstract class ControlComponent implements SetMap {

  protected map: any;

  abstract afterSetMap(): void

  setMap(value: any) {
    if (this.map) return;
    this.map = value;
    this.afterSetMap();
  }

}
