import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Type
} from '@angular/core';

import { InfoPopupComponent } from '../control';

declare const mapboxgl: any;

const MbMap = mapboxgl.Map;
const LngLat = mapboxgl.LngLat;

@Component({
  selector: 'mb-map',
  templateUrl: 'map.component.html'
})
export class MapComponent {

  private static id: number = 1;

  private containerId: string;
  private element: any;
  private map: any;

  @Input('mbStyle') style: string;
  @Input() width: number;
  @Input() height: number;
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() zoom: number = 12;
  @Output('mbClick') click: EventEmitter<any> = new EventEmitter();
  @Output() moveend: EventEmitter<any> = new EventEmitter();

  @ContentChildren(InfoPopupComponent) controls: QueryList<InfoPopupComponent>;

  constructor() {
    this.containerId = `mb-map-${MapComponent.id++}`;
  }

  ngOnChanges() {
    if (!this.map) return;

    const map = this.map;

    const center = map.getCenter();
    if (center.lng !== this.longitude && center.lat !== this.latitude) map.setCenter([this.longitude, this.latitude]);

    if (map.getZoom() !== this.zoom) map.setZoom(this.zoom);
  }

  ngAfterViewInit() {
    this.map = this.createMap();
    this.registerEventHandlers();
    this.addControls();
  }

  private addControls() {
    if (!this.controls) return;
    this.controls.forEach((control) => control.setMap(this.map));
  }

  private createMap() {
    return new MbMap({
      container: this.containerId,
      style: this.style,
      center: [this.longitude, this.latitude],
      zoom: this.zoom
    });
  }

  private registerEventHandlers() {
    this.map.on('moveend', () => {
      this.moveend.emit({
        center: this.normalizeLngLat(this.map.getCenter()),
        zoom: this.map.getZoom()
      });
    });

    this.map.on('click', (event) => {
      event.lngLat = this.normalizeLngLat(event.lngLat);
      this.click.emit(event);
    });
  }

  private getStyles() {
    return {
      width: this.width ? `${this.width}px` : '100%',
      height: this.height ? `${this.height}px` : '100%'
    };
  }

  private normalizeLngLat(lngLat) {
    return new LngLat(lngLat.lng % 180, lngLat.lat)
  }
}
