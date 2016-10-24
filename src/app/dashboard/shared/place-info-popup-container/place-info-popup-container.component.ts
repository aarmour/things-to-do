import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Place } from '../../../core/app-state/models/place.model';

@Component({
  selector: 'ttd-place-info-popup-container',
  templateUrl: './place-info-popup-container.component.html',
  styleUrls: ['./place-info-popup-container.component.scss']
})
export class PlaceInfoPopupContainerComponent implements OnInit {

  @Input() place: Place;
  @Input() point: mapboxgl.LngLat;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onCreateEventClick() {
    console.log('onCreateEventClick');
    this.createEvent.emit({ placeName: this.place.placeName, point: this.point });
  }

}
