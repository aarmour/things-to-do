import { Component, ContentChild, Input, QueryList } from '@angular/core';

import { GeojsonSourceComponent } from '../geojson-source/geojson-source.component';
import { SetMap } from '../set-map';

@Component({
  selector: 'mb-layer',
  template: ''
})
export class LayerComponent implements SetMap {

  private map: any;

  @Input('layerId') id: String;
  @Input('layerType') type: String;

  @ContentChild(GeojsonSourceComponent) source: GeojsonSourceComponent;

  constructor() { }

  setMap(map: any) {
    if (!this.map) this.map = map;
    if (!this.source) return;
    this.addSource();
    this.addLayer();
  }

  private addLayer() {
    this.map.on('load', () => {
      this.map.addLayer({
        id: this.id,
        type: this.type,
        source: this.source.id,
        // TODO: make this an input
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
        }
      });
    });
  }

  private addSource() {
    this.source.setMap(this.map);
  }

}
