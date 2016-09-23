import {
  Component,
  EventEmitter,
  Input,
  Output,
  Type
} from '@angular/core';
declare const mapboxgl: any;

const MbMap = mapboxgl.Map;

@Component({
  moduleId: module.id,
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

  constructor() {
    this.containerId = `mb-map-${MapComponent.id++}`;
  }

  ngOnChange() {
    if (!this.map) return;

    const map = this.map;

    const center = map.getCenter();
    if (center.lng !== this.longitude && center.lat !== this.latitude) map.setCenter([this.longitude, this.latitude]);

    if (map.getZoom() !== this.zoom) map.setZoom(this.zoom);
  }

  ngAfterViewInit() {
    this.map = this.createMap();
    this.registerEventHandlers();
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
    this.map.on('moveend', () => this.moveend.emit({
      center: this.map.getCenter(),
      zoom: this.map.getZoom()
    }));

    this.map.on('click', (event) => this.click.emit(event));
  }

  private getStyles() {
    return {
      width: this.width ? `${this.width}px` : '100%',
      height: this.height ? `${this.height}px` : '100%'
    };
  }
}
