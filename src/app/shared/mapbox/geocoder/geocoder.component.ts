import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { GeocoderService } from './geocoder.service';

const DEBOUNCE_TIME = 300;

@Component({
  moduleId: module.id,
  selector: 'ttd-geocoder',
  templateUrl: 'geocoder.component.html',
  styleUrls: ['geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

  private items: Subject<string[]>;
  private query: string;
  private queryStream: Subject<string> = new Subject<string>();

  constructor(private geocoderService: GeocoderService) { }

  ngOnInit() {
    this.items = <Subject<string[]>>this.queryStream
      .debounceTime(DEBOUNCE_TIME)
      .distinctUntilChanged()
      .switchMap((query: string) => this.geocoderService.geocode(query)
        .map(result => result.features
          .map(feature => feature.place_name)));
  }

  onQueryChange(query) {
    this.queryStream.next(query);
  }

}
