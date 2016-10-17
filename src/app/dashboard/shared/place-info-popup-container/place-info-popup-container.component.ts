import { Component, Input, OnInit } from '@angular/core';

import { Place } from '../../../core/app-state/models/place.model';

@Component({
  selector: 'ttd-place-info-popup-container',
  templateUrl: './place-info-popup-container.component.html',
  styleUrls: ['./place-info-popup-container.component.scss']
})
export class PlaceInfoPopupContainerComponent implements OnInit {

  @Input() place: Place;
  @Input() point: mapboxgl.LngLat;

  constructor() { }

  ngOnInit() {
  }

}
