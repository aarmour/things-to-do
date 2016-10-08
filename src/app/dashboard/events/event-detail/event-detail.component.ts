import { Component, OnInit } from '@angular/core';

import { EventsApiService } from '../../../core/api';

@Component({
  selector: 'ttd-event-detail',
  templateUrl: 'event-detail.component.html',
  styleUrls: ['event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  constructor(private eventsApi: EventsApiService) { }

  ngOnInit() {
    this.eventsApi.fetch('8e5cfc26-a88e-4634-bdda-c6c7a72b22c4')
      .subscribe(event => console.log(event));
  }

}
