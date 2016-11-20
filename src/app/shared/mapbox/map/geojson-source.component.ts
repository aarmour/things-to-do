import { Component, Input } from '@angular/core';

import { SetMap } from '../set-map';

@Component({
  selector: 'mb-geojson-source',
  template: ''
})
export class GeojsonSourceComponent implements SetMap {

  private map: any;

  @Input('sourceId') id: String;
  @Input('sourceData') data: any;

  constructor() { }

  ngOnChanges() {
    if (!this.map) return;

    const source = this.map.getSource(this.id);
    if (source) source.setData(this.data);
  }

  setMap(map: any) {
    this.map = map;
    map.on('load', () => map.addSource(this.id, this.createSource()));
  }

  private createSource() {
    return {
      type: 'geojson',
      data: this.data
    };
  }

}
